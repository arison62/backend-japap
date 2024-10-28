import UserService from "@services/userService";
import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "@configs/db";
import User from "@models/users";
import mongoose from "mongoose";


let connP : mongoose.Connection | undefined;

beforeAll(async () => {
  connP = await connectDB();
  if(!connP){
    throw Error("Error connection");
  }
});

// async function setup() {
//   await User.deleteMany({});
//   console.log("setup test");
// }

async function teardown() {
  if (connP) {
    await connP.close();
  }
}

// beforeEach(async () => {
//   await setup();
// });

afterAll(async () => {
  await teardown();
});

describe("UserService", () => {
  test("test createUser", async() => {
    const userService = new UserService();
    const user = await userService.createUser("username", "email", "password");
    expect(user).not.toBeNull()
    console.log('End create');
  });
});