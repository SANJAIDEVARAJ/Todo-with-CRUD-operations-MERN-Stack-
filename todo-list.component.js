import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = ({ todo }) => (
  <tr>
    <td className={todo.todo_completed ? "completed" : ""}>
      {todo.todo_description}
    </td>
    <td className={todo.todo_completed ? "completed" : ""}>
      {todo.todo_responsible}
    </td>
    <td className={todo.todo_completed ? "completed" : ""}>
      {todo.todo_priority}
    </td>
    <td>
      <Link to={"/edit/" + todo._id}>Edit</Link>
    </td>
  </tr>
);

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentWillMount() {
    axios
      .get("https://day5-backend.herokuapp.com/todos/")
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("https://day5-backend.herokuapp.com/todos/")
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map(function (currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todo List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
