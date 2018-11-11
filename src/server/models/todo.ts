import { Document, Schema, Model, model} from 'mongoose';
import { ITodo } from '../../interfaces/todo';

export interface ITodoModel extends ITodo, Document {};

export let TodoSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

export const Todo: Model<ITodoModel> = model<ITodoModel>("Todo", TodoSchema);

