const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const findOneUser = require('../repository/user');


exports.login = async (req, res, next) => {
    if (!req.body.password || !req.body.email){
      return res.status(400).json({error: 'Missing fields'})
    }
    const user = await findOneUser(req.body.email);
    console.log(user);
    const crypt = cryptojs.SHA256(req.body.email).toString();
    const hash = await bcrypt.hash(req.body.password, 10);
    return res.status(200).json({})
};