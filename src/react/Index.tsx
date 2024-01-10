import React from "react";
import TodoItem from "./TodoItem";
import ItemCount from "./ItemCount";

const Index = ({ todos, itemsLeft, filter }: any) => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form
          hx-post="/todos"
          hx-target="#todo-list"
          hx-swap="afterbegin"
          {...({ _: "on htmx:afterOnLoad set #new-todo.value to ''" } as any)}
        >
          <input
            className="new-todo"
            id="new-todo"
            placeholder="What needs to be done?"
            name="name"
            autoFocus={true}
          />
        </form>
      </header>

      <section className="main">
        <ul className="todo-list" id="todo-list">
          {todos.map((todo: any, key: number) => (
            <TodoItem todo={todo} key={key} />
          ))}
        </ul>
      </section>
      <footer className="footer">
        <ItemCount itemsLeft={itemsLeft} />

        <ul className="filters">
          <li>
            <a
              className={`${filter === "all" ? "selected" : ""}`}
              href="/?filter=all"
            >
              All
            </a>
          </li>
          <li>
            <a
              className={`${filter === "active" ? "selected" : ""}`}
              href="/?filter=active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={`${filter === "completed" ? "selected" : ""}`}
              href="/?filter=completed"
            >
              Completed
            </a>
          </li>
          <li id="fetch">
            <a
              hx-post="/data"
              hx-target="#todo-list"
              hx-swap="afterbegin"
              {...{ _: `on htmx:afterOnLoad remove #fetch` }}
              style={{ cursor: "pointer" }}
            >
              Fetch
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Index;
