if (process.env.NODE_ENV === 'production') {
    console.log("production");
    module.exports = require('./prod');
} else {
    console.log("DEV");
    module.exports = require('./dev');
}