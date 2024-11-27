
const handleLoginSuccess = async (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({
            user: req.session.user,
        });
    } else {
        res.status(401).json({
            message: 'User not logged in',
        });
    }
}

const handleLoginFailed = async (req, res) => {
    res.status(401).json({message: "Login with google failed"});
}

const handleLogout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid');
            res.redirect(process.env.CLIENT_URL);
        });
    });
}
module.exports = {
    handleLoginSuccess,
    handleLoginFailed,
    handleLogout,
}