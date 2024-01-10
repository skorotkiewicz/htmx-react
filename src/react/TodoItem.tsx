import React from "react";

const TodoItem = ({ todo }: any) => {
  return (
    <li id={`todo-${todo.id}`} key={todo.id}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={todo.isCompleted}
          hx-patch={`/todos/${todo.id}`}
          hx-swap="outerHTML"
          hx-target={`#todo-${todo.id}`}
        />
        <label htmlFor="">{todo.name}</label>
        <button
          className="destroy"
          hx-delete={`/todos/${todo.id}`}
          {...({ _: `on htmx:afterOnLoad remove #todo-${todo.id}` } as any)}
        ></button>
      </div>
    </li>
  );
};

export default TodoItem;
