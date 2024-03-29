const conn = require('./mysql');

module.exports = {
    findOneUserByMail: async email => {
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
    },
    createUser: async user => {
        return new Promise(resolve => {
            conn.query('INSERT INTO user SET ?', [user], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        }) 
    },
    findOneUserById: async userId => {
        return new Promise(resolve => {
            conn.query( 'SELECT email, firstname, lastname, admin FROM user WHERE userId = ? LIMIT 1' , [userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    },
    deleteUser: async userId => {
        return new Promise(resolve => {
            conn.query('DELETE FROM user WHERE userId = ? LIMIT 1', [userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                return resolve(results)
            })
        });
    },
    findOneAdminById: async userId => {
        return new Promise(resolve => {
            conn.query( 'SELECT email, firstname, lastname FROM user WHERE userId = ? AND admin = 1 LIMIT 1' , [userId], (err, results) => {
                if (err){
                    return resolve(null);
                }
                if (results.length === 1) 
                    return resolve(results[0])   
                return resolve(null)
            });
        })
    },
    updateUserData: async (user, userId) => {
        return new Promise(resolve => {
            conn.query('UPDATE user SET ? WHERE userId = ? LIMIT 1', [user, userId], (err, results) => {
                if (err){
                    return console.log(err)
                }
                return resolve(results)
            })
        });
    }
    };
