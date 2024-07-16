import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
      const { name, email, password } = req.body;

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

      const user = await userModel.create({ name, email, password });

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

