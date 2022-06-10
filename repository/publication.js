const { resolve } = require('path');
const conn = require('./mysql');



module.exports = {
    createPublication: async publication => {
        return new Promise(resolve => {
            conn.query('INSERT INTO publication SET ?', [publication], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    getOnePublicationByPostId: async (postid, userId) => {
        return new Promise (resolve => {
            conn.query('SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    },
    updatePublication: async (postid, userId) => {
        return new Promise(resolve => {
            conn.query('UPDATE publication SET ? WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    deletePublication: async (postid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM publication WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    getAllPublicationsPaginated: async (offset, limit) => {
        return new Promise (resolve => {
            conn.query('SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId LIMIT ?, ?',[offset, limit], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    },
    getCount: async () => {
        return new Promise (resolve => {
            conn.query('SELECT COUNT(*) AS total FROM publication',[], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results[0].total)
        })
    });
    }
};
