import { connectToDatabase } from "@db/db.js";
import { Todo } from "@models/Todo.js";
import { todos } from "@data/data.js";
export const seedDatabase = async () => {
  await connectToDatabase();
  await Todo.deleteMany({});
  await Todo.insertMany(todos);
};
