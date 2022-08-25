const { resolve } = require('path');
const conn = require('./mysql');

module.exports = (() => {
   const createComment= async comment => {
        return new Promise(resolve => {
            conn.query('INSERT INTO comment SET ?', [comment], async (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(await getOneCommentByCommentId(results.insertId, comment.authorid))
            })
        });
    }
    const updateComment = async (updated, commentid, userId) => {
        return new Promise(resolve => {
            conn.query('UPDATE comment SET ? WHERE commentid = ? AND authorid = ? LIMIT 1', [updated, commentid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    const deleteComment= async (commentid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM comment WHERE commentid = ? AND authorid = ? LIMIT 1', [commentid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    const getAllCommentsPaginated= async (postid, offset, limit) => {
        return new Promise (resolve => {
            conn.query('SELECT c.authorid, c.commentid, c.content, c.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM comment c JOIN `user` u ON c.authorid = u.userId WHERE postid = ? ORDER BY c.create_at DESC LIMIT ?, ?',[postid, offset, limit], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    }
    const getCount=async (postid) => {
        return new Promise (resolve => {
            conn.query('SELECT COUNT(*) AS total FROM comment WHERE postid = ? ',[postid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results[0].total)
        })
    });
    }
    const getOneCommentByCommentId= async (commentid, userId) => {
        return new Promise (resolve => {
            conn.query('SELECT c.postid, c.commentid, c.content, c.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM comment c JOIN `user` u ON c.authorid = u.userId WHERE commentid = ? AND userId = ? LIMIT 1', [commentid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    }
    const deleteCommentByAdmin = async (commentid) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM comment WHERE commentid = ? LIMIT 1', [commentid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    const updateCommentByAdmin = async (updated, commentid) => {
        return new Promise(resolve => {
            conn.query('UPDATE comment SET ? WHERE commentid = ?  LIMIT 1', [updated, commentid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    return {createComment, deleteComment, updateComment, getAllCommentsPaginated, getCount, getOneCommentByCommentId, deleteCommentByAdmin, updateCommentByAdmin}
})()
