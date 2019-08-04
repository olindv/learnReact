import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

let id = 0;

function getId() {
  id += 1;
  return id;
}

class App extends Component {
  state = {
    inputValue: "",
    todos: [
      {
        value: ""
      }
    ]
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      const { inputValue, todos } = this.state;
      const newTodo = { value: inputValue, id: getId() };
      this.setState({ inputValue: "", todos: [...todos, newTodo] });
    }
  };

  handleDel = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => id !== todo.id)
    }));
  };

  render() {
    const { inputValue, todos } = this.state;
    return (
      <div className="container">
        <input
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="input"
        />
        <div>
          {todos.map(todo => (
            <Todo
              onDel={this.handleDel}
              text={todo.value}
              key={todo.value}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Todo extends Component {
  handleDel = () => {
    const { id, onDel } = this.props;
    onDel(id);
  };
  render() {
    const { text } = this.props;
    return (
      <div>
        <span>{text}</span>
        <span onClick={this.handleDel} className="del-button">
          X
        </span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
