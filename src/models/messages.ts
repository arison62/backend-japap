import {Schema, model, Types, Model} from "mongoose";

export interface IMessage {
    conversation: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;
    created_at: Date;
    updated_at: Date;
}

const messageSchema = new Schema<IMessage>({
    conversation: {type: Schema.Types.ObjectId, ref: "Conversation"},
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    content: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

export const Message: Model<IMessage> = model<IMessage>("Message", messageSchema);
