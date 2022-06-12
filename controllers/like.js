const { json } = require('express');
const paginate = require("express-paginate");
const like = require('../repository/like');
const {createLike, deleteLike, getAllLikeForOnePublication, getOneLikeByPostidAndUserid} = require('../repository/like');

exports.addLike = async (req,res,next) => {
    const like = {
        userId: req.auth.userId,
        postid: req.params.id,
    };  
    
    const newLike = await createLike(like);

    if (newLike === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'Liked !'})
};

exports.deleteLike = async (req, res) => {
    const like = await getOneLikeByPostidAndUserid (req.params.id, req.auth.userId);
    if (!like) {
        return res.status(404).json({
            error: 'Ressource not found'
        })
    };

    const deletedLike = await deleteLike(req.params.id, req.auth.userId);
    if (deletedLike === null){
        return res.status(500).json({error: "Internal server error"})
    }
    return res.status(200).json({message: 'Deleted like !'})
};

exports.getAllLikes = async (req, res) => {
    const allLikes = await getAllLikeForOnePublication (req.params.id);
    return res.status(200).json(allLikes)
}