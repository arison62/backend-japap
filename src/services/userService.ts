import User, { IUser } from "@models/users";
import bcrypt from "bcryptjs";

interface IUserService {
  getUserById(id: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(
    username: string,
    email: string,
    password: string
  ): Promise<IUser | null>;
  updateUser(
    id: string,
    username: string,
    email: string,
    bio: string,
    profile_picture: string
  ): Promise<IUser | null>;
  deleteUser(id: string): Promise<IUser | null>;
  followUser(followerId: string, followingId: string): Promise<IUser | null>;
  unfollowUser(followerId: string, followingId: string): Promise<IUser | null>;
  searchUsers(searchTerm: string): Promise<IUser[] | null>;
  getFollowers(userId: string): Promise<IUser[] | null>;
  getFollowing(userId: string): Promise<IUser[] | null>;
}

class UserService implements IUserService {
  public async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  public async getUserByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username: username });
  }
  public async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email });
  }

  public async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<IUser | null> {
    const password_hash = await bcrypt.hash(password, 10);
    
    return User.create({
      username: username,
      email: email,
      password_hash: password,
    });
  }
  public async updateUser(
    id: string,
    username: string,
    email: string,
    bio: string,
    profile_picture: string
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, {
      username: username,
      email: email,
      bio: bio,
      profile_picture: profile_picture,
    });
  }
  public async deleteUser(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
  public async followUser(
    followerId: string,
    followingId: string
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      followingId,
      { $push: { followers: followerId } },
      { new: true }
    );
  }
  public async unfollowUser(
    followerId: string,
    followingId: string
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      followingId,
      { $pull: { followers: followerId } },
      { new: true }
    );
  }
  public async searchUsers(searchTerm: string): Promise<IUser[] | null> {
    return User.find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }
  public async getFollowers(userId: string): Promise<IUser[] | null> {
    let result = await User.findById(userId).populate("followers");
    let followers = result as unknown as { followers: IUser[] };
    return followers.followers;
  }
  public async getFollowing(userId: string): Promise<IUser[] | null> {
    let result = await User.findById(userId).populate("following");
    let following = result as unknown as { following: IUser[] };
    return following.following;
  }
}

export default UserService;