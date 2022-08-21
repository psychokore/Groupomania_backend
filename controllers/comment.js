const { createComment, updateComment, deleteComment, getAllCommentsPaginated, getCount, getOneCommentByCommentId } = require ('../repository/comment')

exports.publish = async (req,res,next) => {
    if (!req.body.comment){
        return res.status(400).json({error: 'Missing fields'})
      }

    const comment = {
        authorid: req.auth.userId,
        content: req.body.comment,
        postid: req.params.id,
        create_at: new Date()
    };  
    
    const newComment = await createComment(comment);

    if (newComment === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json(newComment)
};

exports.modifyComment = async (req, res) => {
    if (!req.body.comment){
        return res.status(400).json({error: 'Missing fields'})
      }
    
    const comment = await getOneCommentByCommentId(req.params.id, req.auth.userId);
    if (!comment) {
        return res.status(404).json({
            error: 'Ressource not found'
        })
    };
    const updated = {
        commentid: req.params.id,
        content: req.body.comment,
    };
    
    const updatedComment = await updateComment(updated)
    if (updatedComment === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'Updated comment !'})
    

};

exports.deleteComment = async (req, res) => {
    const comment = await getOneCommentByCommentId(req.params.id, req.auth.userId);
    if (!comment) {
        return res.status(404).json({
            error: 'Ressource not found'
        })
    };
    
    const deletedComment = await deleteComment(req.params.id, req.auth.userId);
    if (deletedComment === null){
        return res.status(500).json({error: "Internal server error"})
    }
    return res.status(200).json({message: 'Deleted comment !'})


};

exports.getAllComments = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const allComments = await getAllCommentsPaginated (req.params.id, offset*limit, limit)
    const totalComments = await getCount(req.params.id)
    const pageCount = Math.ceil(totalComments / limit);
        res.status(200).json({
            data: allComments,
            pageCount,
            pages: offset +1
        });    
};