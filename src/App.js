import axios from 'axios';
import Navbar from './component/Navbar/Navbar';
import Products from './component/Product/Products';
import { useEffect, useState } from 'react';
import Cart from './component/Cart/Cart';
import Topbar from './component/Topbar/Topbar';
import Cartitems from './component/Cartitems/Cartitems';

function App() {

  const [cart, setCart] = useState([]);
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [viewItems, setViewItems] = useState(false);

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (componentMounted) {
          setData(response.data);
          setFilter(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const filterProduct = (cat)=>{
    const updatedList = data.filter((x)=>x.category === cat);
    setFilter(updatedList)
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
    <>
      <Topbar/>
    <div className="App">
      <Navbar filterProduct={filterProduct} setFilter={setFilter} data={data}/>
      {viewItems ? <Cartitems cart={cart}/>:<Products filter={filter} addToCart={addToCart}/>}
      <Cart clearCart={clearCart} getCartTotal={getCartTotal} removeItem={removeItem} changeQuantity={changeQuantity} cart={cart} setViewItems={setViewItems}/>
    </div>
    </>
  );
}

export default App;
