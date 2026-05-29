const bcrypt = require("bcryptjs");
console.log(bcrypt.hashSync("ChangeMe123!", 10));
