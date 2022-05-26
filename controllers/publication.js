const { json } = require('express');
const fs = require('fs');
const publication = require('../repository/publication');
const {createPublication, getAllPublications, getOnePublicationByPostId, deletePublication, updatePublication} = require('../repository/publication');

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
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'Published !'})
};

exports.modifyPublication = async (req, res) => {
    const publicationObject = req.file ?
    {
      ...JSON.parse(req.body.publication),
      imageurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    const publication = await getOnePublicationByPostId(req.params.id);
    if (!publication) {
        return res.status(404).json({
            error: 'Ressource not found'
        })
    };
    if (req.file) {
        const filename = publication.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {});
    }
    const updated = {
        postid: req.params.id,
        content: publicationObject.content,
        imageurl: null
    };
    
    const updatedPublication = await updatePublication(updated)
    if (updatedPublication === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'Updated post !'})
    

};

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




















