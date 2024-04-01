import React from "react";

function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity ? item.quantity + 1 : 2 };
      }
      return item;
    });
    setCart(newCart);
  };

  const decrementQuantity = (productId) => {
    const newCart = cart.map((item) => {
      if (item.id === productId && item.quantity && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  if (cart.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              Price: ${item.price} - Quantity: {item.quantity || 1}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => decrementQuantity(item.id)}
            >
              -
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => incrementQuantity(item.id)}
            >
              +
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
