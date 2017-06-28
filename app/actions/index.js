const authActions  = require('./auth')
const usersActions = require('./users')
const notificationsActions = require('./notifications')

module.exports = { 
    ...authActions,
    ...usersActions,
    ...notificationsActions
}