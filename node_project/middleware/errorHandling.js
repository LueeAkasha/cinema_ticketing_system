
const errorHandling = (req, res, next) => {
    console.log('We are handling error!')
    return next()
}

module.exports = 
    errorHandling
