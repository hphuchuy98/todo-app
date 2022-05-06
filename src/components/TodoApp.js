import React, { useState, useEffect } from "react";
import Todos from "./Todos";
import Header from "./layout/Header";
import AddTodo from "./AddTodo";

import axios from "axios"; //Khai báo thư viện axios

function TodoApp () {
    useEffect(() => {
        const config = {
            params: {
                _limit: 5
            }
        }
        //Tạo GET request để lấy danh sách todos
        axios.get("https://jsonplaceholder.typicode.com/todos", config)
            .then(response => setState({ todos: response.data }));
    }, []);

    const addTodo = title => {
        const todoData = {
            title: title,
            completed: false
        };
        axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
            .then(response => {
                console.log(response.data)
                setState({
                    todos: [...state.todos, response.data]
                })
            });
    };

    const deleteTodo = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => setState ({
                todos: [
                    ...state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                ]
            }))
    };

    const handleCheckboxChange = id => {
        setState({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        });
    };

    const [state, setState] = useState({
        todos: []
    });

    return (
        <div className="container">
            <Header />
            <AddTodo addTodo={addTodo} />
            <Todos
                todos={state.todos}
                handleChange={handleCheckboxChange}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default TodoApp;
