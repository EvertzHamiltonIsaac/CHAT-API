const nodemailer = require('nodemailer')
const config = require('../../config')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'evertzhamilton1326@gmail.com',
        pass: config.api.emailPass
    }
})

module.exports = transporter
