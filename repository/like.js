const { resolve } = require('path');
const conn = require('./mysql');

module.exports = (() => {
    const createLike = async like => {
        return new Promise(resolve => {
            conn.query('INSERT INTO publications_like SET ?', [like], async (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(await getOneLikeByPostidAndUserid(like.postid, like.userId))
            })
        });
    }
    const deleteLike= async (postid, userId) => {
        return new Promise(resolve => {
            conn.query('DELETE FROM publications_like WHERE postid = ? AND userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    }
    const getAllLikeForOnePublication= async (postid) => {
        return new Promise (resolve => {
            conn.query('SELECT l.userId, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publications_like l JOIN `user` u ON l.userId = u.userId WHERE l.postid = ?',[postid], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve (results)
        })
    });
    }
    const getOneLikeByPostidAndUserid = async (postid, userId) => {
        return new Promise (resolve => {
            conn.query('SELECT l.userId, CONCAT (u.firstname," ", u.lastname) AS authorpseudo FROM publications_like l JOIN `user` u ON l.userId = u.userId WHERE l.postid = ? AND l.userId = ? LIMIT 1', [postid, userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    }
    return {createLike, deleteLike, getAllLikeForOnePublication, getOneLikeByPostidAndUserid}
})()