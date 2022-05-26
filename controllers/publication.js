const { json } = require('express');
const fs = require('fs');
const publication = require('../repository/publication');
const {createPublication, getAllPublications, getOnePublicationByPostId} = require('../repository/publication');

exports.publish = async (req,res,next) => {
    if (!req.body.publication){
        return res.status(400).json({error: 'Missing fields'})
      }
    const publicationObject = JSON.parse(req.body.publication);
    if (!publicationObject.content){
        return res.status(400).json({error: 'Missing fields'})
      }
    const publication = {
        authorid: req.auth.userId,
        content: publicationObject.content,
        imageurl: null,
        create_at: new Date()
    };  
    if (req.file?.filename){
        publication.imageurl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    const newPublication = await createPublication(publication);

    if (newPublication === null){
        return res.status(500).json({error: "Internal server eroor"})
    }
    
    return res.status(201).json({message: 'Published !'})
};

exports.modifyPublication = async (req, res) => {
    
}

exports.deletePublication = async (req, res) => {
    
}

exports.getAllPublications = async (req, res) => {
    await getAllPublications();
}

exports.getOnePublicationByPostId = async (req, res) => {
    const postid = req.params.id;
    const post = await getOnePublicationByPostId(postid);
    if (!post) {
        return res.status(404).json({error: 'No results'})
    }
}



















/*
exports.getAllPublications = async (req, res) => {
    const getAllPublications = await getAllPublications(publication)
    .then(
        res.status(200).json(publication)
    )
    .catch(
        (error) => {
            res.status(500).json({error: 'Internal server error'})
        }
    );
}
*/

