import React from 'react'
import './Cartitems.css'

const Cartitems = ({cart}) => {
  return (
    <div className='product_main'>
                <>
                <div className='col-md-3 mb-4'>
                  {cart.map(cart => (
                    <div className="product-card" >
                      <img src={cart.image} alt="Product" className="product-card__image" />
                      <div className="product-card__body">
                        <h2 className="product-card__title">{cart.title.substring(0,75)}</h2>
                      </div>
                      <hr style={{'color':'black'}}/>
                        <p className="product-card__price" style={{'textAlign':'center'}}>{cart.price}</p>
                    </div>
                    ))}
                  </div>
                </>
    </div>
  )
}

export default Cartitems