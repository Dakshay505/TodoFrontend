import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState({});
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const editHandler = async (id) => {
    try {
      setEdit(true);

      const { data } = await axios.get(`${server}/task/${id}`);
      console.log(data);
      setTaskId(data.task._id);
      setTitle(data.task.title);
      setDescription(data.task.description);
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      setEdit(false);
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      setLoading(true);
      if (edit === true) {
        url = `${server}/task/edit`;
      } else {
        url = `${server}/task/new`;
      }
      const { data } = await axios.post(
        url,
        { id: taskId, title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      setEdit(false);
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textArea"
              style={{
                minHeight: "100px",
                width: "100%",
                outline: "none",
                borderRadius: "10px",
                border: "1px solid #ccc",
                padding: "8px", 
                resize: "vertical",
                fontSize: "15px",
              }}
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {edit === true ? (
              <button disabled={loading} type="submit">
                update Task
              </button>
            ) : (
              <button disabled={loading} type="submit">
                Add Task
              </button>
            )}
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
