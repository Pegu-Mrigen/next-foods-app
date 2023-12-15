"use client"
import React, { useEffect, useState } from 'react'
import Trash from '../icons/Trash';
import Plus from '../icons/Plus';
import MenuItemProps from './MenuItemProps';

const MenuItemForm = ({onSubmit, menuItem}) => {
    const [image, setImage] = useState(menuItem?.image || "");
    const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrice, setExtraIngredientPrice] = useState(menuItem?.extraIngredientPrice || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState( []);


  const addSize=()=>{

    setSizes(oldSizes=>{
      return [...oldSizes, {name:"", price:""}]
    })


  }
  const editSize=(e, index, prop)=>{  


    setSizes(prevSizes=>{
      const newSizes=[...prevSizes]

      newSizes[index][prop]= e.target.value
      return newSizes
    })
    

  }

  const removeSize=(index)=>{
    setSizes(prev=>prev.filter((v,i)=>i !==index))
  }

  useEffect(()=>{

    fetch("/api/categories").then(res=>{
      res.json().then(categories=>{
        setCategories(categories)
      })
    })



  }, [])
  
  return (
    <form className="  mt-8 max-w-2xl mx-auto  " 
    
    
    // onSubmit={onSubmit}
    onSubmit={e=>onSubmit(e, {image, name, description, basePrice,extraIngredientPrice, sizes, category })}
    
    
    >
    <div className="grid items-start     p-2  gap-4  ">
      <div className="grow ">
        <label>Menu item name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label> Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)}>{categories?.length>0 && categories.map(c=>(
          <option key={c._id} value={c._id}>{c.name}</option>
          // <option key={c._id} >{c.name}</option>
        ))}</select>
        <label>Base price</label>
        <input
          type="text"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />

        {/* <div className='bg-gray-200 p-2 rounded-md mb-2 w-[500px]'>
          <label>Sizes</label>
          {sizes?.length>0 && sizes.map((size, index)=>(
            <div className='flex gap-2 ' key={index}>
              <div><label>Size name</label><input type="text" placeholder='Size name' value={size.name} onChange={e=>editSize(e, index, "name")} /></div>
              <div><label>Extra price</label><input type="text" placeholder='Extra price' value={size.price}  onChange={e=>editSize(e, index, "price")} /></div>

              <div>
                <button type='button' onClick={()=>removeSize(index)} className='bg-white mb-2 px-2 mt-6'>
                  <Trash />
                </button>
              </div>
            </div>

          ))}
          <button type='button' onClick={addSize} className='bg-white'>
            <Plus />
            <span>Add item size</span>
          </button>
        </div> */}

        <MenuItemProps name={"Sizes"} props={sizes} addLabel={"Add item size"} setProps={setSizes} />
        <MenuItemProps name={"Extra ingredients"} props={extraIngredientPrice} addLabel={"Add ingredient price"} setProps={setExtraIngredientPrice} />

        <button type="submit">Save</button>
      </div>
    </div>
  </form>


  )
}

export default MenuItemForm