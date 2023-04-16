import React from 'react'
import './Products.css'

const Products = ({filter,addToCart}) => {
  
  return (
    <div className='product_main'>
                <>
                  {filter.map(product => (
                    <div className='col-md-3 mb-4'>
                        <div className="product-card">
                          <img src={product.image} alt="Product" className="product-card__image" />
                          <div className="product-card__body">
                            <h2 className="product-card__title">{product.title.substring(0,75)}</h2>
                          </div>
                          <hr style={{'color':'black'}}/>
                          <div className='product_price_btn'>
                            <p className="product-card__price">{product.price}</p>
                            <button className="product-card__add-button" onClick={()=>addToCart(product)}>Add</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                </>
    </div>
  )
}

export default Products