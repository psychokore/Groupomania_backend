const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const {findOneUserByMail, createUser, findOneUserById, deleteUser, updateUserData} = require('../repository/user');



exports.signup = async (req,res,next) => {
    if (!req.body.password || !req.body.email){
        return res.status(400).json({error: 'Missing fields'})
      }

    let firstNameRegExp = new RegExp('^[A-Za-z éèëôîï-]+$', 'g');
    let testFirstName = firstNameRegExp.test(req.body.firstname);
    if (!testFirstName){
        return res.status(400).json({error:'Veuillez saisir un prénom valide'})
    }  
    let lastNameRegExp = new RegExp('^[A-Za-z éèëôîï-]+$', 'g');
    let testLastName = lastNameRegExp.test(req.body.lastname);
    if (!testLastName){
        return res.status(400).json({error:'Veuillez saisir un nom valide'})
    }
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.+-]+[.]{1}[a-z]{2,10}$', 'g'
    );
    let testEmail = emailRegExp.test(req.body.email);
    if (!testEmail){
        return res.status(400).json({error:'Veuillez saisir une adresse mail valide'})
    }
    const email = cryptojs.SHA256(req.body.email).toString();
    const password = await bcrypt.hash(req.body.password, 10);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: email,
        password: password
    }

    
    const newUser = await createUser(user);
    if (newUser === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'Utilisateur créé'})

}



exports.login = async (req, res, next) => {
    if (!req.body.password || !req.body.email){
      return res.status(400).json({error: 'Missing fields'})
    }
    const email = cryptojs.SHA256(req.body.email).toString();
    const user = await findOneUserByMail(email);
    if (!user) {
        return res.status(404).json({ error: 'Les identifiants sont incorrects' });
    }
    
    
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(404).json({ error: 'Les identifiants sont incorrects' });
            }
            return res.status(200).json({
                userId: user.userId,
                isAdmin: user.admin === 1,
                token: jwt.sign(
                    { userId: user.userId, isAdmin: user.admin === 1},
                    process.env.JWTOKEN,
                    { expiresIn: '1h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

exports.refresh = (req, res) => {
res.status(200).json({
    userId: req.auth.userId,
    token: jwt.sign(
        { userId: req.auth.userId},
        process.env.JWTOKEN,
        { expiresIn: '1h'}
    )
});
}

exports.getUserData = async (req, res) => {
    const userData = await findOneUserById(req.auth.userId);
    return res.status(200).json({data: userData});

}

exports.deleteAccount = async (req, res) => {
    const deleted = await deleteUser(req.auth.userId)
    return res.status(200).json({message: 'Account deleted'})
}


exports.updateUserData = async (req,res) => {
    if (!req.body.firstname || !req.body.lastname){
        return res.status(400).json({error: 'Missing fields'})
      }


    let firstNameRegExp = new RegExp('^[A-Za-z éèëôîï-]+$', 'g');
    let testFirstName = firstNameRegExp.test(req.body.firstname);
    if (!testFirstName){
        return res.status(400).json({error:'Veuillez saisir un prénom valide'})
    }  
    let lastNameRegExp = new RegExp('^[A-Za-z éèëôîï-]+$', 'g');
    let testLastName = lastNameRegExp.test(req.body.lastname);
    if (!testLastName){
        return res.status(400).json({error:'Veuillez saisir un nom valide'})
    }
    
    const updatedProfil = await updateUserData(req.body.firstname, req.body.lastname, req.auth.userId)
    if (updatedProfil === null){
        return res.status(500).json({error: "Internal server error"})
    }
    
    return res.status(201).json({message: 'updated profil'})
}