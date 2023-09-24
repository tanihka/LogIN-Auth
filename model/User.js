import mongoose from "mongoose";

const UserSchema =new mongoose.Schema(
    {
        name:{required: true, type: String, trim:true},
        email:{required: true, type: String, trim:true},
        password:{required: true, type: String, trim:true}
    }
)

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;