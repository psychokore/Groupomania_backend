const { json } = require('express');
const paginate = require("express-paginate");
const fs = require('fs');
const comment = require('../repository/comment');
const {createComment, updateComment, deleteComment, getAllCommentsPaginated, getCount, getOneCommentByCommentId} = require('../repository/comment');

exports.publish = async (req,res,next) => {
    if (!req.body.comment){
        return res.status(400).json({error: 'Missing fields'})
      }
    const commentObject = JSON.parse(req.body.comment);
    if (!commentObject.content){
        return res.status(400).json({error: 'Missing fields'})
      }
    const comment = {
        authorid: req.auth.userId,
        content: commentObject.content,
        postid: req.params.id,
        create_at: new Date()
    };  
    
    const newComment = await createComment(comment);

    if (newComment === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'Published !'})
};

