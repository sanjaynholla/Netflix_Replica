const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeader = req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err){
                res.status(403).json({msg: `Token is not Valid!`});
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({msg: `You are not authenticated!`});
    }
}

module.exports = verifyToken