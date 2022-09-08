const { expressjwt: jwt } = require("express-jwt")
const authorize = (role) => {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret: "internshipsecret", algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            console.log(req);
            if ((req.auth.role === "admin" && role != "admin") || (req.auth.role === "user" && role != "user")) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // if(req.auth.role === "user" && role!="user")
            //     return res.status(401).json({ message: 'Unauthorized' });
            // authentication and authorization successful
            next();
        }
    ];
}
module.exports = authorize