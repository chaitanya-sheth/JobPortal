import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
      const { name, email, password, lastName } = req.body;

      // Validate
      if (!name) {
          throw new Error("Please provide a name");
      }
      if (!email) {
          throw new Error("Please provide an email");
      }
      if (!password) {
          throw new Error("Please provide a password");
      }

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
          throw new Error("Email already registered, please login");
      }

      const user = await userModel.create({ name, email, password, lastName });

      const token = user.createJWT();

      res.status(200).send({
          success: true,
          message: "User created successfully",
          user:{
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            location:user.location
          },
          token
      });
  } catch (error) {
      next(error);
  }
};

export const loginController = async (req,res,next) => {

  const {email,password} = req.body;

  if(!email || !password){
    return next("Invalid username or password")
  }

  const user = await userModel.findOne({email}).select("+password")
  if(!user){
    return next("User not found")
  }

  const isMatch = await user.comparePassword(password)
  console.log(password)

  if(!isMatch){
    return next("Invalid credentials")
  }
  user.password = undefined
  const token = user.createJWT()
  res.status(200).json({
    success:true,
    message: "Login Successfully",
    user,
    token
  })
}

