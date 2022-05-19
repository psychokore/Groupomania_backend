const { json } = require('express');
const fs = require('fs');
const {createPublication} = require('../repository/publication');

exports.publish = async (req,res,next) => {
    if (!req.body.content || !req.body.imageurl){
        return res.status(400).json({error: 'Missing fields'})
      }
    const publicationObject = JSON.parse(req.body.publication);
    delete publicationObject._id;
    const publication = {
        ...publicationObject,
        imageurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };  

    const newPublication = await createPublication(publication);

    if (newPublication === null){
        return res.status(500).json({error: "Internal server eroor"})
    }
    
    return res.status(201).json({message: 'Published !'})


    };
