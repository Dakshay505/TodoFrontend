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
      <div >
        <h4>{title}</h4>
        <p style={{height:"100px",boxSizing:"border-box"}}>{description}</p>
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