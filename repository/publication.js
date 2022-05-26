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
    getAllPublications: async publication => {
        return new Promise (resolve => {
            conn.query('SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname, u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId',[publication], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    },
    getOnePublicationByPostId: async postid => {
        return new Promise (resolve => {
            conn.query('SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname, u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId WHERE postid = ? LIMIT 1', [postid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    },
    updatePublication: async publication => {
        return new Promise(resolve => {
            conn.query('UPDATE publication SET ? WHERE postid = ? LIMIT 1', [publication], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    deletePublication: async publication => {
        return new Promise(resolve => {
            conn.query('DELETE FROM publication WHERE postid = ? LIMIT 1', [publication], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }

};





/*
UPDATE publication 
SET content = newcontent,
    imageurl = newimageurl,
WHERE postid = ? AND authorid = ? LIMIT 1  
*/  

/*
DELETE FROM publication WHERE postid = ? and authorid = ? LIMIT 1
*/








//Récupération des publications avec l'auteur
// SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname,' ', u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId;


// SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname,' ', u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId WHERE postid = ? LIMIT 1