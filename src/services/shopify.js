import axios from "axios";

const shopify = axios.create({
    baseURL: "https://6hzrmn-ts.myshopify.com/api/2024-01/graphql.json",
    headers: {
        "X-Shopify-Storefront-Access-Token": "86e08a88e7916ae5f919c963dd1742ec",
        "Content-Type": "application/json",
    },
});

export const shopifyQuery = async (query, variables = {}) => {
    const res = await shopify.post("", { query, variables });
    return res.data.data;
};
