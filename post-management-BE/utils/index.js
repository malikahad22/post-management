const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const hash_password = (password) => {
   const salt = 12;
   return bcrypt.hash(password, salt);
}

const compare_hash_password = async (userInputPassword, storedHashedPassword) => {
   const result = await bcrypt.compare(userInputPassword, storedHashedPassword);
   return result;
}

const email_validator = (email) => {
   const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
   if (!emailRegex.test(email)) return false;
   return true;
}

const generate_jwt = (user) => {

   const payload = {
      id: user.id,
      role: user.role
   };
   const secret = process.env.JWT_SECRET;
   const options = { expiresIn: '1h' };

   return jwt.sign(payload, secret, options);

}


module.exports = {
   hash_password,
   compare_hash_password,
   email_validator,
   generate_jwt,
}