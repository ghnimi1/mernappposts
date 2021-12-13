const Post = require('../models/posts.model')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

const AllPosts = async (req, res) => {
    await Post.find({ createdBy: req.params.id }).sort('createdAt')
        .then(posts => {
            res.status(StatusCodes.OK).send({ posts, count: posts.length })
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err })
        })

}
const AllPostss = async (req, res) => {
    await Post.find({}).sort('createdAt')
        .then(posts => {
            res.status(StatusCodes.OK).json({ posts, count: posts.length })
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err })
        })
}
const getPost = async (req, res) => {
    await Post.findOne({
        _id: req.params.id,
        createdBy: req.user.userId
    })
        .then(post => {
            if (!post) {
                res.status(StatusCodes.NOT_FOUND).send({ message: `No post wish id ${req.params.id}` })
            }
            res.status(201).send(post)
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err })
        })
}

const createPost = async (req, res) => {
    //req.body.createdBy = req.user.userId
    let photo = ""
    if (req.file) {
        photo = req.file.path
    }
    try {
        const newPost = new Post({
            content: req.body.content,
            photo: photo,
            createdBy: req.user.userId
        })
        await newPost.save()

        res.status(StatusCodes.CREATED).send({ newPost })
    }
    catch (error) {
        console.log('impossible to add contact')
    }

}
const deletePost = async (req, res) => {
    const { id } = req.params
    await Post.findByIdAndRemove({
        _id: id,
        createdBy: req.user.userId
    })
        .then(post => {
            if (!post) {
                res.status(StatusCodes.NOT_FOUND).send({ message: `No post wish id ${req.params.id}` })
            }
            res.status(StatusCodes.OK).send({ message: 'delete successfull' })
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        })
}

const updatePost = async (req, res) => {
    const {
        body: { content },
        user: { userId },
        params: { id: postId },
    } = req

    if (content === '') {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Content fields cannot be empty' })
    }
    await Post.findByIdAndUpdate(
        { _id: postId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )
        .then(post => {
            if (!post) {
                res.status(StatusCodes.NOT_FOUND).send({ message: `No job with id ${postId}` })
            }
            res.status(StatusCodes.OK).send({ post })
        })

}

const commentPost = async (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                comments: {
                    createdBy: req.user.userId,
                    comment: req.body.comment,
                    timestamp: new Date().getTime(),
                },
            },
        },
        { new: true },
        (err, docs) => {
            if (!err) return res.status(StatusCodes.OK).send(docs);
            else return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
        }
    );

}

const likePost = async (req, res) => {
    const { id } = req.params
    const { userId } = req.user;
    await Post.findById(id)
        .then(post => {
            post.likeCount++
            post.likedBy.push({ author: userId, name: req.user.name, isLiked: true });
            post.save();
            res.status(StatusCodes.OK).send(post);
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err })
        })
}

const unlikePost = async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    const { id } = req.params
    const { userId } = req.user
    await Post.findByIdAndUpdate({ _id: new ObjectId(id) })
        .then(post => {
            post.likeCount--
            post.likedBy = post.likedBy.filter(like => like.author != userId)
            post.save();
            res.json(post);
        })
        .catch(err => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err })
        })
}

module.exports = {
    createPost,
    AllPosts,
    AllPostss,
    getPost,
    deletePost,
    updatePost,
    commentPost,
    likePost,
    unlikePost
}