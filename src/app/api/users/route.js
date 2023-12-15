import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);


  // const url = new URL(req.url);

  // const _id = url.searchParams.get("_id");

  if (await isAdmin()) {
    // const users = await User.find({ _id });
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
