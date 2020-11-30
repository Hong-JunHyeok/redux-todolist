import { useLayoutEffect } from "react";
import { createStore } from "redux";

const input = document.querySelector("input");
const submit = document.querySelector("button");
const ul = document.querySelector("ul");

const ADD = "ADD";
const REMOVE = "REMOVE";

const todoReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];
        case REMOVE:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
};

const todoStore = createStore(todoReducer);

todoStore.subscribe(() => console.log(todoStore.getState()));

const paintTodo = () => {
    const todos = todoStore.getState();
    ul.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        li.id = todo.id;
        li.innerText = todo.text;
        btn.innerText = "DEL";
        btn.addEventListener("click", deleteTodo);
        ul.appendChild(li);
        li.appendChild(btn);
    });
};
todoStore.subscribe(paintTodo);

const addTodo = (text) => {
    todoStore.dispatch({ type: ADD, text });
};

const deleteTodo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    todoStore.dispatch({ type: REMOVE, id });
};

const onSubmit = (e) => {
    e.preventDefault();
    const todo = input.value;
    addTodo(todo);
    input.value = "";
};

submit.addEventListener("click", onSubmit);
