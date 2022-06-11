const { resolve } = require('path');
const conn = require('./mysql');

module.exports = {
    createLike: async like => {
        return new Promise(resolve => {
            conn.query('INSERT INTO publicationslike SET ?', [like], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    deleteLike: async (postid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM publicationslike WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    getAllLikeForOnePublication: async (postid) => {
        return new Promise (resolve => {
            conn.query('SELECT l.userId, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publicationsLike l JOIN `user` u ON l.userId = u.userId WHERE l.postid = ?',[postid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    },
    getCount: async (postid) => {
        return new Promise (resolve => {
            conn.query('SELECT COUNT(*) AS total FROM publicationslike WHERE postid = ?',[postid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results[0].total)
        })
    });
    },
    getOneLikeByPostidAndUserid: async (postid, userId) => {
        return new Promise (resolve => {
            conn.query('SELECT l.userId CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publicationslike l JOIN `user` u ON l.userId = u.userId WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    }
};