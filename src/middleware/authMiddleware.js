import { getUserById } from "../model/user/UserModel.js";

export const userAuth = async (req, res, next) => {
  // check if user exist with _id or not
  try {
    const { authorization } = req.headers;

    const user = await getUserById(authorization);
    if (user?._id) {
      req.userId = authorization;
      next();
      return;
    }

    res.status(403).json({
      status: "error",
      message: "Unauthrized",
    });
  } catch (error) {
    next(error);
  }
};
