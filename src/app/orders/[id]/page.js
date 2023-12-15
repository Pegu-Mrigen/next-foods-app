"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/layout/CartProduct";

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);

  const [order, setOrder] = useState();
  const [loadingOrders, setLoadingOrders] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrders(true)
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrders(false)
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let subtotal=0
  if(order?.cartProducts){
    for (const product of order?.cartProducts){
        subtotal +=cartProductPrice(product)
    }
  }
  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your have ordered successfully!" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way</p>
        </div>
      </div>
      {loadingOrders && (
        <div>Loading order...</div>
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-600">
              Subtotal:
              <span className="text-black font-bold inline-block w-16">{subtotal}</span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-16">Rs/- 20</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-16">Rs/- {subtotal + 20}</span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
