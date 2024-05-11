import React, { useEffect, useState } from 'react'
import "./ExploreMenu.css"
import {menu_list} from     '../../assets/frontend_assets/assets'

function ExploreMenu({category,setCategory}) {
useEffect(()=>{
    setCategory('All')
},[])

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore out Menu</h1>
        <p>Choose from  diverse menu featuring delectable array </p>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index) => {
                    return  (
                        <div onClick={()=> setCategory(prev=>prev === item.menu?"All": item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img src={item.menu_image } className={category === item.menu_name?"active":""} alt=""  />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMenu
