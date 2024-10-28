import {Schema, model, Model,Types} from "mongoose";

export interface IUser {
 username: string,
 email : string,
 password_hash: string,
 bio?: string,
 profile_picture?: string,
 followers : Types.ObjectId[],
 following : Types.ObjectId[],
 created_at: Date,
 updated_at: Date,
 verified: boolean,
};

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password_hash: {type: String, required: true},
    bio: String,
    profile_picture: String,
    followers: [{type: Schema.Types.ObjectId, ref: "User"}],
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    verified: {type: Boolean, default: false},
});

const User: Model<IUser> = model<IUser>("User", userSchema);
export default User;
