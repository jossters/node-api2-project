// implement your posts router here

const express = require('express')

const router = express.Router()

const Posts = require('./posts-model')

router.get('/', async (req, res) => {
try {
    const posts = await Posts.find(req.query)
    res.status(200).json(posts)
} catch (err) {
    res.status(500).json({
        message: 'The posts information could not be retrieved',
        error: err.message,
    })
}
})

 router.get('/:id', async(req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post information could not be retrieved',
            error: err.message,
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const post = await Posts.insert(req.body)
        if (!post.title || !post.contents){
            res.status(400).json({
                message: "Please provide title and contents for the post",
            })
        } else {
            res.status(201).json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
            error: err.message,
        })
    }
})

router.put('/:id', async(req, res) => {
    try {
        const changes = req.body;
        const post = await Posts.update(req.params.id, changes)
        if (!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else if (!post.title || !post.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post",
            })

        } else {
            res.status(201).json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
            error: err.message,
        })
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message:"The post with the specified ID does not exist",
            })
        } else {
        const deletedPost = await Posts.remove(post.id)
        res.status.json(deletedPost)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post could not be removed',
            error: err.message,
        })
    }
})

router.get ('/:id/comments', async(req, res) => {
    try {
        const post = await Posts.findCommentById(req.params.id)
        if (!post) {
            res.status(404).json({
                message:"The post with the specified ID does not exist",
            })
        } else {
            res.status.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The comments information could not be retrieved',
            error: err.message,
        })
    }
})

module.exports = router