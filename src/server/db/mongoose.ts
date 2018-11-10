import * as mongoose from 'mongoose';

let s = mongoose.connect('process.ENV.MONGODB_URI || mongodb://localhost:27017/TodoApp');