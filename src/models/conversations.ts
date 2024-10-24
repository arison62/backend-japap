import {Schema, model, Model, Types} from "mongoose";

interface IConversation {
    users: Types.ObjectId[];
    messages: Types.ObjectId[];
    created_at: Date;
    updated_at: Date;
}

const conversationSchema = new Schema<IConversation>({
    users: [{type: Schema.Types.ObjectId, ref: "User"}],
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

export const Conversation: Model<IConversation> = model<IConversation>("Conversation", conversationSchema);
