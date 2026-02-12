import { createContext, useState, useEffect } from "react";
import { shopifyQuery } from "../services/shopify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);

    const token = localStorage.getItem("customerToken");

    useEffect(() => {
        if (token) fetchCustomer(token);
    }, []);

    const fetchCustomer = async (token) => {
        const query = `
      query getCustomer($token: String!) {
        customer(customerAccessToken: $token) {
          id
          firstName
          email
        }
      }
    `;
        const data = await shopifyQuery(query, { token });
        setCustomer(data.customer);
    };

    const register = async (email, password, firstName, lastName) => {
        const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { message }
      }
    }
  `;

        return await shopifyQuery(query, {
            input: { email, password, firstName, lastName },
        });
    };


    const login = async (email, password) => {
        const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
          }
          customerUserErrors { message }
        }
      }
    `;

        const data = await shopifyQuery(query, {
            input: { email, password },
        });

        const token =
            data.customerAccessTokenCreate.customerAccessToken?.accessToken;

        if (token) {
            localStorage.setItem("customerToken", token);
            fetchCustomer(token);
        }

        return data;
    };

    const logout = () => {
        localStorage.removeItem("customerToken");
        setCustomer(null);
    };

    return (
        <AuthContext.Provider value={{ customer, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
