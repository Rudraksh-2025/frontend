import { createContext, useEffect, useState } from "react";
import { shopifyQuery } from "../services/shopify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) fetchCart(cartId);
    else setLoading(false);
  }, []);

  function normalizeCart(cart) {
    return {
      ...cart,
      lines: cart?.lines?.edges
        ? cart.lines.edges.map(edge => edge.node)
        : cart?.lines || [],
    };
  }

  const CART_FRAGMENT = `
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
                width
                height
              }
              product {
                title
              }
            }
          }
        }
      }
    }
  `;

  const fetchCart = async (cartId) => {
    setLoading(true);

    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          ${CART_FRAGMENT}
        }
      }
    `;

    const data = await shopifyQuery(query, { cartId });

    if (!data?.cart) {
      setCart(null);
      setLoading(false);
      return;
    }

    setCart(normalizeCart(data.cart));
    setLoading(false);
  };

  const createCart = async () => {
    const query = `
      mutation {
        cartCreate {
          cart {
            ${CART_FRAGMENT}
          }
        }
      }
    `;

    const data = await shopifyQuery(query);

    const newCart = data.cartCreate.cart;

    localStorage.setItem("cartId", newCart.id);

    const normalized = normalizeCart(newCart);
    setCart(normalized);

    return normalized;
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
            ${CART_FRAGMENT}
          }
        }
      }
    `;

    const data = await shopifyQuery(query, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity: qty }],
    });

    setCart(normalizeCart(data.cartLinesAdd.cart));
  };

  const updateQuantity = async (lineId, quantity) => {
    if (quantity < 1) return removeItem(lineId);

    const cartId = localStorage.getItem("cartId");

    const query = `
      mutation updateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ${CART_FRAGMENT}
          }
        }
      }
    `;

    const data = await shopifyQuery(query, {
      cartId,
      lines: [{ id: lineId, quantity }],
    });

    setCart(normalizeCart(data.cartLinesUpdate.cart));
  };

  const removeItem = async (lineId) => {
    const cartId = localStorage.getItem("cartId");

    const query = `
      mutation removeLine($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ${CART_FRAGMENT}
          }
        }
      }
    `;

    const data = await shopifyQuery(query, {
      cartId,
      lineIds: [lineId],
    });

    setCart(normalizeCart(data.cartLinesRemove.cart));
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
