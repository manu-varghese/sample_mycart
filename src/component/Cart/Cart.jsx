import React from 'react'
import './Cart.css'

const Cart = ({clearCart,getCartTotal,removeItem,changeQuantity,cart,setViewItems}) => {
  return (
    <div>
      <div className='cart'>
        <div className='cart_top'>
            <p>Your Cart</p>
            <p>{cart.length} items</p>
            {cart.length === 0 ? '': <p onClick={()=>setViewItems(true)}>view items</p>}
        </div>
        <hr />
        {cart.length === 0 ? <p style={{'textAlign':'center'}}>Cart Empty!</p>:
        <div>
        {cart.map(item => (
        <div className='cart_items' key={item.id}>
            <p className='cart_item_name'>{item.title}</p>
            <p>{item.price}</p>
            <input type="number" className='quantity' value={item.quantity} onChange={(e) => changeQuantity(item.id, e.target.value)} />
            <img src="https://static.thenounproject.com/png/1043974-200.png" style={{"width":"20px","height":"20px"}} onClick={() => removeItem(item.id)} alt="" />
        </div>
        ))}
        <hr />
        <div className='bottom_div'>
          <h6 style={{'textAlign':'center'}}>Total : {getCartTotal()}</h6>
          <button className='clearCart' onClick={clearCart}>Clear Cart</button>
        </div>
        <button className='backtoproducts_btn' onClick={()=>setViewItems(false)}>Back to Products</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Cart