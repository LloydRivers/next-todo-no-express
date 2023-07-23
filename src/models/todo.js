import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
