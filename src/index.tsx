import React from "react";
import { renderToStaticMarkup as render } from "react-dom/server";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { v4 as uuid } from "uuid";

import axios from "axios";
import { Todo, DataType } from "./types/todo.interface";
import Layout from "./react/Layout";
import Index from "./react/Index";
import TodoItem from "./react/TodoItem";
import ItemCount from "./react/ItemCount";

const app = express();
const port = 3000;

let todos: Todo[] = [];
const getItemsLeft = () => todos.filter((todo) => !todo.isCompleted).length;
const getFilteredTodos = (filter: unknown) => {
  if (filter === "active") {
    return todos.filter((todo) => !todo.isCompleted);
  } else if (filter === "completed") {
    return todos.filter((todo) => todo.isCompleted);
  } else {
    return todos;
  }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "styles")));

app.get("/", (req, res) => {
  const markup = render(
    <Layout>
      <Index
        todos={getFilteredTodos(req.query.filter)}
        itemsLeft={getItemsLeft()}
        filter={req.query.filter}
      />
    </Layout>
  );

  res.send(markup);
});

app.post("/todos", (req: any, res: any) => {
  const name = req.body.name;
  if (!name) return res.status(401).send("");

  const newTodo: Todo = {
    id: uuid(),
    name: req.body.name,
    isCompleted: false,
  };
  todos.push(newTodo);

  const markup = render(
    <>
      <TodoItem todo={newTodo} />
      <ItemCount itemsLeft={getItemsLeft()} />
    </>
  );

  res.send(markup);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== req.params.id);

  res.send(render(ItemCount({ itemsLeft: getItemsLeft() })));
});

app.patch("/todos/:id", (req: any, res: any) => {
  const todo = todos.find((todo) => todo.id === req.params.id);

  if (!todo) {
    return res.sendStatus(404);
  }

  todo.isCompleted = !todo.isCompleted;

  const markup = render(
    <>
      <TodoItem todo={todo} />
      <ItemCount itemsLeft={getItemsLeft()} />
    </>
  );

  res.send(markup);
});

app.post("/data", async (_req: any, res: any) => {
  const json = await axios.get<DataType[] | any>(
    "https://a.sekor.eu.org/todo.json"
  );

  todos.push(...json.data);

  const markup = render(
    <>
      {todos.map((todo: any, key: number) => (
        <TodoItem todo={todo} key={key} />
      ))}

      <ItemCount itemsLeft={getItemsLeft()} />
    </>
  );

  res.send(markup);
});

app.listen(port, () => {
  console.log(`Server listening on port :${port}`);
});
