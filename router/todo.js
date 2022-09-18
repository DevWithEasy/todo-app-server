const { createTodo, getAllTodo, getSingleTodo, updateTodo, deleteTodo } = require('../controller/todo');

const router = require('express').Router();

router.post('/',createTodo)
router.get('/all/:id',getAllTodo)
router.get('/:id',getSingleTodo)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

module.exports = router