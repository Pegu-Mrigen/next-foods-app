import { Span } from 'next/dist/trace'
import React from 'react'
import AddToCartButton from './AddToCartButton'

const MenuItemTile = ({onAddToCart, ...item}) => {

  //console.log(item)

  const {image, description, name, basePrice, sizes, extraIngredientPrice}= item


  const hasSizesOrExtras=sizes?.length>0 || extraIngredientPrice?.length>0
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-black/50 hover:shadow-2xl transition-all">
      <div className="text-center">
        <img src={image} alt="pizza" className="max-h-24 block mx-auto" />
      </div>

      <h4 className="font-semibold my-2 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3 ">
        {description}
      </p>

      {/* <button onClick={()=>addToCart(menuItem)}
        className="bg-primary text-white rounded-full
            px-8 py-2 mt-4"
          > */}
      {/* <button type="button" onClick={()=>onAddToCart(item)}
        className="bg-primary text-white rounded-full
            px-8 py-2 mt-4">
        {hasSizesOrExtras ? 
        (<span>Add to cart (starting Rs/- {basePrice})</span>):(
            <span> Add to cart Rs/- {basePrice}</span>
          )}
      </button> */}

      <AddToCartButton hasSizesOrExtras={hasSizesOrExtras}
      onClick={onAddToCart}  basePrice={basePrice} image={image}
       />
    </div>
  )
}

export default MenuItemTile