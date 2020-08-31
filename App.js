import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/todo-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              {/* <img src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiHjOHdhLHjAhUFV80KHaZxDzsQjRx6BAgBEAU&url=https%3A%2F%2Fwww.udemy.com%2Freact-the-complete-guide-incl-redux%2F&psig=AOvVaw25Rf6CutsxaGwR2xXIf6ys&ust=1563077753020679" width="30" height="30" alt="CodingTHeSmartWay.com"/> */}
            </a>
            <Link to="/" className="navbar-brand">
              MERN Stack Todo App
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Todos
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create Todo
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TodoList}/>
          <Route path="/edit/:id" component={EditTodo}/>
          <Route path="/create" component={CreateTodo}/>
        </div>
      </Router>
    );
  }
}

export default App;
