import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "@/app/models/User";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  //adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({credentials})
        mongoose.connect(process.env.MONGO_URL);

        //const {email, password}= credentials
        
        const email = credentials?.email;
        const password = credentials?.password;
        
        const user = await User.findOne({ email });


        const passwordOk = user && bcrypt.compareSync(password, user.password);

        console.log( {user} );
        console.log({ password });
        console.log({ passwordOk });

        if (passwordOk) {
          return user;
        }

        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  // if (!userEmail) {
  //   return false;
  // }
  if (!userEmail) {
    return false;
  }

  const userInfo = await User.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
