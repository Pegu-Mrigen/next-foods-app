"use client";
import { CartContext } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import datTimeModifier from "@/libs/datTime";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, userData: profileData } = useProfile();


  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    fetchOrders()   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchOrders(){
    setLoadingOrders(true)
    fetch("/api/orders").then((res) => {
        res.json().then((ordersData) => {
          setOrders(ordersData.reverse());
          setLoadingOrders(false)
        });
      });
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto ">
      <UserTabs isAdmin={profileData.admin} />

      <div className="mt-8">

        {loadingOrders && (
            <div>Loading orders...</div>
        )}
        {orders?.length > 0 ?(
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-200 mb-2 p-4 rounded-lg flex flex-col md:flex-row  items-center gap-6 "
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-600 " : "bg-red-500 ") +
                      "p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                <div className="text-gray-500 text-sm">
                  {datTimeModifier(order.createdAt)}
                </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Menu Items:{" "}
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className=" flex justify-end gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Order detail
                </Link>
              </div>
            </div>
          ))):""


        }
          {!orders && <div>No order available from you!</div>}
          
          
          
      </div>
    </section>
  );
};

export default OrdersPage;
