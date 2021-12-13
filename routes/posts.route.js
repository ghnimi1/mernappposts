const express = require('express')
const router = express.Router()
const PostController = require('../controllers/posts.controller')
const auth = require('../middleware/auth')
const fileUpload = require('../middleware/file-upload')

router.get('/c/:id', auth, PostController.AllPosts)
router.get('/p', PostController.AllPostss)
router.get('/:id', auth, PostController.getPost)
router.post('/create', auth, fileUpload.single('photo'), PostController.createPost)
router.delete('/:id', auth, PostController.deletePost)
router.patch('/:id', auth, PostController.updatePost)
router.post('/:id/commentPost', auth, PostController.commentPost)
router.get('/:id/likePost', auth, PostController.likePost)
router.get('/:id/unlikePost', auth, PostController.unlikePost)

module.exports = router