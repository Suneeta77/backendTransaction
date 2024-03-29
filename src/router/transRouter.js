import express from "express";
import {
  deleteTrans,
  getUserTrans,
  insertTrans,
} from "../model/transaction/TransModel.js";
import { userAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

// insert transaction
router.post("/", userAuth, async (req, res) => {
  try {
    // call model for query
    console.log(req.body);
    const result = await insertTrans({ ...req.body, userId: req.userId });

    result?._id
      ? res.json({
          status: "success",
          message: "Transaction has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the transaction, please try again later",
        });
  } catch (error) {
    res.json({
      stauts: "error",
      message: error.message,
    });
  }
});

// get all transaction for specific user only
router.get("/", userAuth, async (req, res, next) => {
  try {
    const transList = await getUserTrans(req.userId);
    res.json({
      status: "success",
      message: "here are the list",
      transList,
    });
  } catch (error) {
    next(error);
  }
});

// delete transactions

router.delete("/", userAuth, async (req, res, next) => {
  try {
    const { userId, body } = req;

    const result = await deleteTrans(userId, body);

    result.deletedCount
      ? res.json({
          status: "success",
          message: `${result.deletedCount} Transaction has been deleted`,
        })
      : res.json({
          status: "error",
          message: "Unable to delete the transaction, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
