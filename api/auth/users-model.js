const db = require('../../data/db-config')

module.exports = {
    add, 
    get, 
    getBy,
}

function add (user) {
    return db('users').insert(user)
}

function get () {
     return db('users')
}

function getBy (filter) {
    return db('users').where(filter).first()
}