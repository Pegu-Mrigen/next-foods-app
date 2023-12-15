import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name:{type:String},
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("password length must be at least 5 characters");
        }
      },
    },
    image:{type:String},
    phone:{type:String},
    postalCode:{type:String},
    city:{type:String},
    streetAddress:{type:String},
    country:{type:String},
    admin:{type:Boolean, default:false},
    
  },
  { timestamps: true }
);

// UserSchema.post("validate", function(){

//     console.log(arguments)
// })

// UserSchema.post("validate", function(user){

//     user.password="newpassword"
// })

UserSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);

  user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User = models?.User || model("User", UserSchema);
