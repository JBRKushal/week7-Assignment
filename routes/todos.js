
const express = require('express');
const router = express.Router();

let todos = [];
let currentId = 1;

// Helper function to find a todo by ID
function findTodoById(id) {
    return todos.find(todo => todo.id === id);
}

// GET /todos - Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});

// GET /todos/:id - Get specific todo
router.get('/:id', (req, res) => {
    const todo = findTodoById(parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// POST /todos - Create new todo
router.post('/', (req, res) => {
    const { title, description = '', completed = false } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = {
        id: currentId++,
        title,
        description,
        completed,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Update existing todo
router.put('/:id', (req, res) => {
    const todo = findTodoById(parseInt(req.params.id));
    if (todo) {
        const { title, description, completed } = req.body;
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// DELETE /todos/:id - Delete todo
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

module.exports = router;
