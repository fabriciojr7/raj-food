import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [productsCart, setProductsCart] = useState([]);

  function addProductCart(prod) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === prod.id);
    if (!item) {
      copyProductsCart.push({
        id: prod.id,
        foto: prod.image,
        nome: prod.nome,
        preco: prod.preco,
        subtotal: prod.preco,
        qtd: 1,
      });
    } else {
      item.qtd += 1;
      item.subtotal = item.preco * item.qtd;
    }
    setProductsCart(copyProductsCart);
  }

  function removeProductCart(prod) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === prod.id);

    if (item && item.qtd > 1) {
      item.qtd -= 1;
      item.subtotal = item.preco * item.qtd;
      setProductsCart(copyProductsCart);
    } else {
      const productFiltered = copyProductsCart.filter(
        (product) => product.id !== prod.id,
      );
      setProductsCart(productFiltered);
    }
  }

  function clearCart() {
    setProductsCart([]);
  }

  const value = useMemo(() => ({
    addProductCart,
    removeProductCart,
    clearCart,
    productsCart,
  }), [addProductCart, removeProductCart, clearCart]);

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}
