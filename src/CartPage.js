import React, { useState } from 'react';
import productsData from './products.json';
import './CartPage.css'; // Import your CSS file

const CartPage = () => {
  const initialCart = {
    items: [],
  };

  const [cart, setCart] = useState(initialCart);

  const addToCart = (product) => {
    const existingItem = cart.items.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      setCart((prevCart) => ({
        items: prevCart.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart((prevCart) => ({
        items: [...prevCart.items, { ...product, quantity: 1 }],
      }));
    }
  };

  const removeFromCart = (productId) => {
    // Remove the item from the cart
    setCart((prevCart) => ({
      items: prevCart.items.filter((item) => item.id !== productId),
    }));
  };

  const calculateTotalQuantity = () => {
    // Calculate the total quantity of items in the cart
    return cart.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    // Calculate the total amount of items in the cart
    return cart.items.reduce((totalAmount, item) => totalAmount + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsData.products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
                {product.title}
              </td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals">
        <h3>Total Quantity: {calculateTotalQuantity()}</h3>
        <h3>Total Amount: ${calculateTotalAmount()}</h3>
      </div>
    </div>
  );
};

export default CartPage;
