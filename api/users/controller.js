require("dotenv").config();
const User = require("./model");
const { connect } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// signup
const Signup = async (req, res) => {
  const { username, password, email, profilepic } = req.body;

  try {
    await connect(process.env.MONGO_URL);
    const checkExist = await User.exists({ email: email });

    if (checkExist) {
      res.json({
        message: "User Already Exist",
      });
    } else {
      await User.create({
        username,
        password: await hash(password, 12),
        email,
      });
      res.json({
        message: "Successfully Signedin",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// login
const Login = async (req, res) => {
  const { password, email } = req.body;
  try {
    await connect(process.env.MONGO_URL);
    const checkExistUser = await User.findOne({ email: email });

    if (!checkExistUser) {
      res.json({
        message: "User Not Found",
      });
    } else {
      const dcrypt = await compare(password, checkExistUser.password);

      if (email == checkExistUser.email && dcrypt) {
        const token = sign(
          {
            username: checkExistUser.username,
            id: checkExistUser._id,
            email: checkExistUser.email,
            profile: checkExistUser.profilepic,
            role: checkExistUser.role
          },
          process.env.JWT_SECRET
        );

        res.json({
          message: "Successfully Loggedin",
          token: token,
        });
      } else {
        res.json({
          message: "Invalid password or email",
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Get AllUsers
const AllUsers = async (req, res) => {

  try {
    await connect(process.env.MONGO_URL)
    const Users = await User.find()
    res.json({
      Users
    })
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

}

// Get User by Email
const UserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    await connect(process.env.MONGO_URL)
    const Users = await User.find({ email })
    res.json({
      Users
    })
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

}

// Get User by id
const UserById = async (req, res) => {

  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URL)
    const Users = await User.find({ _id })
    res.json({
      Users
    })
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

}

// update
const UpdateUser = async (req, res) => {
  const { username, profilepic } = req.body
  const update = { username, profilepic }
  try {
    await connect(process.env.MONGO_URL)
    const Users = await User.findOneAndUpdate(update)
    res.json({
      message: "user Updated successfully"
    })
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

}

// delete
const DeleteUser = async (req, res) => {
  const { username } = req.body

  try {
    await connect(process.env.MONGO_URL)
    const Users = await User.deleteOne({ username })
    res.json({
      message: "User Deleted Successfully"
    })
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

}



module.exports = { Signup, Login, AllUsers, UserByEmail, UserById, UpdateUser, DeleteUser };
