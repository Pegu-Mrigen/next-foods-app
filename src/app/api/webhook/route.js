const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import { Order } from "@/app/models/Order";
import { buffer } from "micro";

// export async function POST(req) {
//   const sig = req.headers.get("stripe-signature");

//   let event;

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    // const reqBuffer = await req.text();
    // const signSecret = process.env.STRIPE_SIGN_SECRET;
    // event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);

    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (err) {
    console.log(err);
    console.error("stripe errror");
    return Response.json(err, { status: 400 });
  }
  //console.log(event);

  if (event.type === "checkout.session.completed") {
    console.log(event);
    console.log({ orderId: event?.data?.object?.metadata?.orderId });
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";

    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return Response.json("ok", { status: 200 });
}
