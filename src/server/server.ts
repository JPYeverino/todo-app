import * as express from 'express';
import * as bodyParser from 'body-parser';

import './db/mongoose';
import { User } from './models/user';
import { Todo } from './models/todo';

const app: express.Application = express();

app.use(bodyParser.json());

app.post('/todos', (req: express.Request, res: express.Response) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => {
    res.send(doc);
  }, e => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req: express.Request, res: express.Response) => {
  Todo.find().then(todos => {
    res.send({ todos });
  }, e => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

export default app;







