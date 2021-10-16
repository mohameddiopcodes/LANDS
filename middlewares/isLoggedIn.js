module.exports = isLoggedIn

function isLoggedIn(req, res, next) {
    if(!req.user) {
        res.redirect('/login')
    }
    res.locals.user = req.user
    next()
}