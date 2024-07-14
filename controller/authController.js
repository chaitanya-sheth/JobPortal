import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validate
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide name" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide email" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide password" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const user = await userModel.create({ name, email, password });
    res.status(200).send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in controller",
      success: false,
      error,
    });
  }
};
