import { createContext, useEffect, useState } from "react";
import { shopifyQuery } from "../services/shopify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) fetchCart(cartId);
  }, []);

  // 🔥 CREATE CART WITH CUSTOMER ATTACHED
  const createCart = async () => {
    const customerToken = localStorage.getItem("customerToken");

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
          }
        }
      }
    `;

    const variables = {
      input: customerToken
        ? {
          buyerIdentity: {
            customerAccessToken: customerToken,
          },
        }
        : {},
    };

    const data = await shopifyQuery(query, variables);

    const newCart = data.cartCreate.cart;

    localStorage.setItem("cartId", newCart.id);
    setCart(newCart);

    return newCart;
  };

  const fetchCart = async (cartId) => {
    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          totalQuantity
          buyerIdentity {
            email
          }
          lines(first:10){
            edges{
              node{
                id
                quantity
                merchandise{
                  ... on ProductVariant{
                    id
                    title
                    product{ title }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await shopifyQuery(query, { cartId });
    setCart(data.cart);
  };

  const addToCart = async (variantId, qty = 1) => {
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const newCart = await createCart();
      cartId = newCart.id;
    }

    const query = `
      mutation addItem($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
          }
        }
      }
    `;

    const data = await shopifyQuery(query, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity: qty }],
    });

    setCart(data.cartLinesAdd.cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
