"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "./../../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "@/components/AppContext";
//import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/layout/CartProduct";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});

  const { userData: profileData } = useProfile();


  useEffect(()=>{
    if(typeof window!=="undefined"){
      if(window.location.href.includes("canceled=1")){
        toast.error("Payment failed 😞")
      }
    }

  }, [])
  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, country, postalCode } = profileData;

      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        country,
        postalCode,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  console.log(profileData);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  console.log(cartProducts);

  // function handleAddressChange(propName, value) {
  //   setAddress((prevAddress) => {
  //     return { ...prevAddress, [propName]: value };
  //   });
  // }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  // async function proceedToCheckout(e) {
  //   e.preventDefault()
  //   const response = await fetch("/api/checkout", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       cartProducts,
  //       address,
  //     }),
  //   });

  // //   const link = await response.json()

  // //  window.location= link
  // window.location = await response.json()

  // }

  //console.log(cartProducts)

  async function proceedToCheckout(e) {
    e.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartProducts,
          address,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if(cartProducts?.length === 0){
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader= "Cart" />
        <p className="mt-4">
          Your shopping cart is empty 😞  
        </p>
      </section>
    )
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid gap-8 grid-cols-2 mt-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              // <div
              //   key={product.name}
              //   className="flex items-center  gap-4 mb-2 border-b py-2"
              // >
              //   <div className="w-24">
              //     <Image src={product.image} alt="" width={240} height={240} />
              //   </div>
              //   <div className="grow">
              //     <h3 className="font-semibold">{product.name}</h3>
              //     {product?.sizes && (
              //       <div className="text-sm">
              //         Size: <span>{product?.sizes?.name}</span>
              //       </div>
              //     )}
              //     {product?.extras?.length > 0 && (
              //       <div className="text-sm text-gray-500">
              //         {product.extras.map((extra) => (
              //           <div key={extra}>
              //             {extra?.name} Rs/- {extra.price}
              //           </div>
              //         ))}
              //       </div>
              //     )}
              //   </div>

              //   <div className="text-lg font-semibold">
              //     Rs/- {cartProductPrice(product)}
              //   </div>
              //   <div className="ml-2">
              //     <button
              //       type="button"
              //       onClick={() => removeCartProduct(index)}
              //       className="p-2"
              //     >
              //       <Trash />
              //     </button>
              //   </div>
              // </div>
              <CartProduct key={product.name} product={product} onRemove={removeCartProduct} />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-600">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>
            <div className=" font-semibold pl-2 text-right">
              Rs/- {subtotal}
              <br />
              Rs/- 5 <br />
              Rs/- {subtotal + 5}
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay Rs/- {subtotal + 20}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
