import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  fogotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken: string,
  verifyTokenExpiry?: Date;
}
const userSchema = new mongoose.Schema<IUser>({
  username: {
  type: String,
  required: [true, "please provide a usernamee"],
  unique: true,
},
  email: {
  type: String,
  required: [true, "Please provide an email"],
  unique: true,
},
  password: {
  type: String,
  required: [true, "Please provide a password"],
},
  isVerified: {
  type: Boolean,
  default: false,
},
  isAdmin: {
  type: Boolean,
  default: false,
},
fogotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
