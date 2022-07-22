const { resolve } = require('path');
const conn = require('./mysql');

module.exports = {
    createLike: async like => {
        return new Promise(resolve => {
            conn.query('INSERT INTO publications_like SET ?', [like], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    deleteLike: async (postid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM publications_like WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    getAllLikeForOnePublication: async (postid) => {
        return new Promise (resolve => {
            conn.query('SELECT l.userId, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publications_like l JOIN `user` u ON l.userId = u.userId WHERE l.postid = ?',[postid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    },
    getOneLikeByPostidAndUserid: async (postid, userId) => {
        return new Promise (resolve => {
            conn.query('SELECT l.userId CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publications_like l JOIN `user` u ON l.userId = u.userId WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
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