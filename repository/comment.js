const { resolve } = require('path');
const conn = require('./mysql');

module.exports = {
    createComment: async comment => {
        return new Promise(resolve => {
            conn.query('INSERT INTO comment SET ?', [comment], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    updateComment : async (commentid, userId) => {
        return new Promise(resolve => {
            conn.query('UPDATE comment SET ? WHERE commentid = ? AND userId = ? LIMIT 1', [commentid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    deleteComment: async (commentid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM comment WHERE commentid = ? AND userId = ? LIMIT 1', [commentid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    getAllCommentsPaginated: async (offset, limit) => {
        return new Promise (resolve => {
            conn.query('SELECT c.commentid, c.content, c.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM comment c JOIN `user` u ON c.authorid = u.userId LIMIT ?, ?',[offset, limit], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    },
    getCount: async () => {
        return new Promise (resolve => {
            conn.query('SELECT COUNT(*) AS total FROM comment',[], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results[0].total)
        })
    });
    },
    getOneCommentByCommentId: async (commentid, userId) => {
        return new Promise (resolve => {
            conn.query('SELECT c.postid, c.commentid, c.content, c.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM comment c JOIN `user` u ON c.authorid = u.userId WHERE commentid = ? AND userId = ? LIMIT 1', [commentid, postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    },
}



/**
getAllCommentsPaginated: async (offset, limit) => {
        return new Promise (resolve => {
            conn.query('SELECT c.commentid, c.content, c.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM comment c JOIN `user` u ON c.authorid = u.userId JOIN `publication` p ON c.postid = p.postid LIMIT ?, ?',[offset, limit], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    }
 */