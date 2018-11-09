import { Document, Schema, Model, model} from 'mongoose';
import { IUser} from "../../interfaces/user";

export interface IUserModel extends IUser, Document {};

export let UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);  
