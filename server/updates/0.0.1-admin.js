'use strict';
const keystone = require('keystone');
const User = keystone.list('User');

module.exports = function(done) {
  new User.model({
    name: { first: 'admin', last: 'user' },
    email: 'chrdengso@gmail.com',
    password: 'password',
    canAccessKeystone: true
  }).save(done);
}