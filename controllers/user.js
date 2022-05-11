const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const findOneUserByMail = require('../repository/user');
const createUser = require ('../repository/user');


exports.signup = async (req,res,next) => {
    if (!req.body.password || !req.body.email){
        return res.status(400).json({error: 'Missing fields'})
      }
    const email = cryptojs.SHA256(req.body.email).toString();
    
    const password = await bcrypt.hash(req.body.password, 10);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: email,
        password: password
    }

    //console.log(user);
    const newUser = await createUser(user);
    //console.log(newUser);

}



exports.login = async (req, res, next) => {
    if (!req.body.password || !req.body.email){
      return res.status(400).json({error: 'Missing fields'})
    }
    const user = await findOneUserByMail(req.body.email);
    console.log(user);
    
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(404).json({ error: 'Les identifiants sont incorrects' });
            }
            res.status(200).json({
                userId: user.userId,
                token: jwt.sign(
                    { userId: user.userId},
                    process.env.JWTOKEN,
                    { expiresIn: '1h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error: 'Internal server error' }));
    return res.status(200).json({})
};