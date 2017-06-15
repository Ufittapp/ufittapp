const authActions  = require('./auth')
const usersActions = require('./users')

module.exports = { 
    ...authActions,
    ...usersActions
}