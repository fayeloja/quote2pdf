// bcrypt helper functions

const bcrypt = require("bcrypt");

exports.hashPassword = (password) => bcrypt.hash(password, 12);

exports.comparePassword = (password, hash) => bcrypt.compare(password, hash);
