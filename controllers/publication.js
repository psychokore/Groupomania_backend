const fs = require('fs');
const {createPublication, getOnePublicationByPostId, deletePublication, updatePublication, getAllPublicationsPaginated, getCount, updatePublicationByAdmin, deletePublicationByAdmin} = require('../repository/publication');
const { findOneAdminById } = require('../repository/user');

exports.publish = async (req,res,next) => {
    if (!req.body.content){
        return res.status(400).json({error: 'Missing fields'})
      }
    

    const publication = {
        authorid: req.auth.userId,
        content: req.body.content,
        imageurl: null,
        create_at: new Date()
    };  
    if (req.file){
        publication.imageurl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    const newPublication = await createPublication(publication);

    if (newPublication === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json(newPublication)
};

exports.modifyPublication = async (req, res) => {


    const publication = await getOnePublicationByPostId(req.params.id);


    if (publication) {
        const updated = {
        content: req.body.textUpdate,
        imageurl: null
        };

        let updatedPublication = null

        if (req.file) {
            if (publication.imageUrl){
                const filename = publication.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});
            }
            updated.imageurl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         
        }
         
    
        if (req.auth.isAdmin) {
            updatedPublication = await updatePublicationByAdmin(updated, req.params.id)
        } else {
            updatedPublication = await updatePublication(updated, req.params.id, req.auth.userId)
        }
        
        
        if (updatedPublication === null){
            return res.status(500).json({error: "Internal server error"})
        }
    
        return res.status(201).json(updatedPublication)
    };
    
    return res.status(404).json({
            error: 'Ressource not found'
    })

};

exports.deletePublication = async (req, res) => {
    const publication = await getOnePublicationByPostId(req.params.id);
    

    if (publication) {
        if (publication.imageUrl){
            const filename = publication.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {});
            }
    
        let deletedPublication = null
        if (req.auth.isAdmin) {
            deletedPublication = await deletePublicationByAdmin(req.params.id)
        } else {
            deletedPublication = await deletePublication(req.params.id, req.auth.userId);
        }
       
        if (deletedPublication === null){
            return res.status(500).json({error: "Internal server error"})
        }
        
        return res.status(200).json({message: 'Deleted post !'}) 
    };
    
    return res.status(404).json({
            error: 'Ressource not found'
        })

};

exports.getAllPublications = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const allPublications = await getAllPublicationsPaginated (offset*limit, limit)
    const totalPublications = await getCount()
    const pageCount = Math.ceil(totalPublications / limit);
        res.status(200).json({
            data: allPublications,
            pageCount,
            pages: offset +1
        });    
        
    
}






















