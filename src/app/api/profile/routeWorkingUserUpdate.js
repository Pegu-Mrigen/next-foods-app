import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();

  const { _id, ...otherData } = data;

  // if(_id){
  //   await User.updateOne({ _id }, data);

  // }else

  // {const session = await getServerSession(authOptions);
  // //console.log({ session, data });
  // const email = session?.user?.email;

  // await User.updateOne({ email }, data);}
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    filter = { email };
  }

  await User.updateOne(filter, otherData);
  //await User.findOneAndUpdate(filter, otherData);

  if (!email) {
    return Response.json({});
  }
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  if (!session) {
    return Response.json({});
  }

  return Response.json(await User.findOne({ email }));
}
