import mongoose, { Schema } from "mongoose";

/* connect to DB */
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise - global.Promise;

/* Screma */
const todoSchema = new Schema(
  {
    description: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
