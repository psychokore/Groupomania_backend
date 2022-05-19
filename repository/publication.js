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