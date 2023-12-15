import React, { useContext } from "react";
import { CartContext, cartProductPrice } from "../AppContext";
import Trash from "../icons/Trash";
import Image from "next/image";

const CartProduct = ({product,onRemove}) => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  return (
    <div
      key={product.name}
      className="flex items-center  gap-4 border-b py-4 text-base "
    >
      <div className="w-24">
        <Image src={product.image} alt="" width={240} height={240} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product?.sizes && (
          <div className="text-sm">
            Size: <span>{product?.sizes?.name}</span>
          </div>
        )}
        {product?.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra}>
                {extra?.name} Rs/- {extra.price}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="font-semibold text-base">
        Rs/- {cartProductPrice(product)}
      </div>
      {!!onRemove &&
      <div className="ml-2">
        <button
          type="button"
          onClick={onRemove}
         // onClick={(index) => removeCartProduct(index)}
          className="p-2"
          >
          <Trash />
        </button>
      </div>
        }
    </div>
  );
};

export default CartProduct;
