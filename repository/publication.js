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
    }
};


//Récupération des publications avec l'auteur
// SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname,' ', u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId;


// SELECT p.postid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname,' ', u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId WHERE postid = ? LIMIT 1