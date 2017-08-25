namespace SessionManagement{

export function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next()

    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

}
export{SessionManagement}