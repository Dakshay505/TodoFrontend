import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  editHandler,
  id,
}) => {
  return (
    <div className="todo">
      <div className="div1">
        <h4>{title}</h4>
        <p className="description">{description}</p>
      </div>
      <div>
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => editHandler(id)} className="btn">
          Edit
        </button>
        <button onClick={() => deleteHandler(id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;