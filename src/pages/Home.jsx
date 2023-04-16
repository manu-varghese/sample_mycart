import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const getProductsByCategory = (category) => {
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }

  const addToCart = (product) => {
    const itemIndex = cart.findIndex(item => item.id === product.id);
    if (itemIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    }
  }

  const changeQuantity = (productId, quantity) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    const updatedCart = [...cart];
    updatedCart[itemIndex].quantity = quantity;
    setCart(updatedCart);
  }

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  }

  const clearCart = () => {
    setCart([]);
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="logo">My Store</Link>
          <ul>
            {categories.map(category => (
              <li key={category}>
                <Link to={`/${category}`} onClick={() => getProductsByCategory(category)}>{category}</Link>
              </li>
            ))}
            <li>
              <Link to="/cart">Cart ({cart.length})</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<h1 className="title">Welcome to our store!</h1>}/>

          {categories.map(category => (
            <Route key={category} path={`/${category}`} element={
              <>
                <h2>{category}</h2>
                <ul>
                  {products.map(product => (
                    <li key={product.id}>
                      {product.title} - ${product.price}
                      <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                  ))}
                </ul>
              </>
            }/>
          ))}

          <Route path="/cart" element={
            <>
              <h2>Cart</h2>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    {item.title} - ${item.price} x
                    <input type="number" value={item.quantity} onChange={(e) => changeQuantity(item.id, e.target.value)} />
                    <button onClick={() => removeItem(item.id)}>Remove Item</button>
                  </li>
                ))}
              </ul>
              <p>Total: ${getCartTotal()}</p>
              <button onClick={clearCart}>Clear Cart</button>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;

