import app from './App'

const port = process.env.PORT || 3000

app.https.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
//
// namespace SessionManagement {
//
//   export function requiredAuthentication(req, res, next) {
//     if (req.session) {
//       next()
//
//     } else {
//       req.x.error = 'Access denied!';
//       res.redirect('/login');
//     }
//   }
//
// }
// export {app,SessionManagement}
