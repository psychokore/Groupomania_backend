const conn = require('./mysql');

module.exports = async function findOneUserByMail(email){
    return new Promise(resolve => {
        conn.query( 'SELECT * FROM user WHERE email = ? LIMIT 1' , [email], (err, results) => {
            if (err){
                return resolve(null);
            }
            if (results.length === 1) 
                return resolve(results[0])   
            return resolve(null)
        });
    })    
};

module.exports = async function createUser(user){
    return new Promise(resolve => {
        conn.query('INSERT INTO user SET ?', [user], (err, results) => {
            if (err){
                return resolve(null);
            }
            //console.log(results);
            return resolve(results)
        })
    })
}