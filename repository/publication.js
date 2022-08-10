const { resolve } = require('path');
const conn = require('./mysql');



module.exports = (() => {
    const createPublication = async publication => {
        
        return new Promise(resolve => {
            conn.query('INSERT INTO publication SET ?', [publication], async (err, results) => { 
                if (err){
                    return resolve(null);
                }
                
                return resolve(await getOnePublicationByPostId(results.insertId, publication.authorid))
            })
        });
    }
    const getOnePublicationByPostId = async (postid, userId) => {
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
    }
    const updatePublication= async (updated, postid, userId) => {
        return new Promise(resolve => {
            conn.query('UPDATE publication SET ? WHERE postid = ? AND authorid = ? LIMIT 1', [updated, postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    const deletePublication= async (postid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM publication WHERE postid = ? AND authorid = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    const getAllPublicationsPaginated= async (offset, limit) => {
        return new Promise (resolve => {
            conn.query('SELECT p.postid,p.authorid, p.content, p.imageurl, p.create_at, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publication p JOIN `user` u ON p.authorid = u.userId ORDER BY p.create_at DESC LIMIT ?, ? ',[offset, limit], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    }
    const getCount= async () => {
        return new Promise (resolve => {
            conn.query('SELECT COUNT(*) AS total FROM publication',[], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results[0].total)
        })
    });
    }
    return {createPublication, getOnePublicationByPostId, updatePublication, deletePublication, getAllPublicationsPaginated, getCount}
})()
