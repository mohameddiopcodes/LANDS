module.exports = isLoggedIn

function isLoggedIn(req, res, next) {
    console.log(res.locals)
    if(!req.user) {
        res.redirect('/login')
    }
    res.locals.user = req.user
    next()
}