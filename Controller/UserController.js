import UserModel from "../model/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

async function UserRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      if (name && email && password && confirmPassword) {
        if (password == confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });
          await doc.save();
          const savedUser = await UserModel.findOne({ email: email });
          const token = jwt.sign({userID: savedUser._id}, process.env.SECRET_KEY)
        } else {
          res.status(400).send("password should be same");
        }
      } else {
        res.status(400).send("Please provide complete value");
      }

      res.status(200).send("User Register !!!");
    } else {
      res.status(400).send("User Already Exist !!!");
    }
  } catch (err) {
    console.log(err);
  }
}
async function UserLogin(req, res) {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await UserModel.findOne({ email });
if(user != null){
const isMatch = await bcrypt.compare(password, user.password)
if(isMatch && email == user.email){
  const savedUser = await UserModel.findOne({ email: email });
  const savedUserDetail = await UserModel.findOne({email}).select("-password");
  const token = jwt.sign({userID: savedUser._id}, process.env.SECRET_KEY)
  //  localStorage.setItem('authToken', token);
    res.status(200).send({ message: "successful login", token: token, user: savedUserDetail});
    // console.log({savedUserDetail})
}else{
    res.status(400).send("password not matched");
}
}else{
    res.status(400).send("User Not Exists");
}
    } else {
      res.status(400).send("Please Provide Complete Value");
    }

   
  } catch (err) {
    console.log(err);
    res.status(400).send("login failed");
  }
}

async function Account(req, res){
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }else{
    res.status(200).json({
      name: user.name,
      email: user.email,
      // Add more user details as needed
    });
  }

}


export default {UserRegister, UserLogin, Account};
