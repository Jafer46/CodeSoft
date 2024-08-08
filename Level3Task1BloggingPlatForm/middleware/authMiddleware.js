const asyncHandler = require('express-async-handler');
const { MESSAGETYPE } = require('../constants/messageConstant');

const authenticate = asyncHandler(async (req, res, next) => {
    
    next();
})


module.exports = authenticate;