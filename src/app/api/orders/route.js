import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { Order } from "@/app/models/Order";
import { isAdmin } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  //return Response.json("hi...........")

  // let isAdmin = false;
  const admin = await isAdmin();

  const url = new URL(req.url);

  //   if(url.searchParams.get("_id")){
  //     return Response.json(url.searchParams.get("_id"))
  //   }
  const _id = url.searchParams.get("_id");

  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  // if (userEmail) {
  //   const userInfo = await User.findOne({ email: userEmail });
  //   if (userInfo) {
  //     isAdmin = userInfo.admin;
  //   }
  // }
  // if (isAdmin) {
  //   return Response.json(await Order.find());
  // }
  if (admin) {
    return Response.json(await Order.find());
  }
  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}
