import React from 'react'
import './Navbar.css'

const Navbar = ({filterProduct,setFilter,data}) => {
  return (
    <div className='nav_main'>
          <ul>
            <li onClick={()=>setFilter(data)}>All</li>
            <li onClick={() => filterProduct(`electronics`)}>Electronics</li>
            <li onClick={() => filterProduct(`jewelery`)}>Jewelery</li>
            <li onClick={() => filterProduct(`men's clothing`)}>Men's clothing</li>
            <li onClick={() => filterProduct(`women's clothing`)}>Women's clothing</li>
          </ul>
    </div>
  )
}

export default Navbar