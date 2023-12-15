import React, { useState } from "react";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

const MenuItemProps = ({ addLabel, name, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addProps = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: "" }];
    });
  };
  const editProps = (e, index, prop) => {
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];

      newSizes[index][prop] = e.target.value;
      return newSizes;
    });
  };

  const removeProps = (index) => {
    setProps((prev) => prev.filter((v, i) => i !== index));
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2 w-[400px]">
      
        
          <button className="inline-flex p-1 border-0 justify-start" type="button" onClick={()=>setIsOpen(prev=>!prev)}>
            {isOpen &&<ChevronUp />}
            {!isOpen &&<ChevronDown />}
            <span>{name}</span>
            <span>({props.length})</span>
          </button>
        
      
      <div className={isOpen?"block":"hidden"}>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div className="flex gap-2 " key={index}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => editProps(e, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editProps(e, index, "price")}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => removeProps(index)}
                className="bg-white mb-2 px-2 mt-6"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={addProps} className="bg-white">
        <Plus />
        <span>{addLabel}</span>
      </button>
    </div>
  );
};

export default MenuItemProps;
