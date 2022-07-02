require('dotenv').config();
import mongoose from "mongoose";
import {envar} from "../config/envar";

const {database} = envar;

export const setupDB = async () => {
  try {
    // Connect to MongoDB
    mongoose
        .connect(database.url, {})
        .then(() =>
            console.log('MongoDB Connected!')
        )
        .catch(error =>
            console.log(error)
        );
  } catch (error) {
    return null;
  }
};