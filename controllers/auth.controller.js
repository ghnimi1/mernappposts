const User = require('../models/user.model')
const { StatusCodes } = require('http-status-codes')
/* const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY); */

const register = async (req, res) => {
    await User.create({ ...req.body })
        .then(user => {
            const token = user.createJWT()
            res.status(StatusCodes.CREATED).send({ user: { name: user.name }, token })
            /* const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Account activation link',
                html: `
                      <h1>Please use the following to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may containe sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                 `
            };
            sgMail
                .send(emailData)
                .then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}`
                    });
                })
                .catch(err => {
                    return res.status(400).json('ok');
                }); */
        }).catch(err => {
            return res.status(500).send({ message: err })
        })

}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ message: 'Please provide email and password' })
    }

    await User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).send({ message: 'Invalid Credentials' })
        }
        // compare password
        const isPasswordCorrect = user.comparePassword(password)
        if (!isPasswordCorrect) {
            return res.status(400).send({ message: 'Invalid Credentials' })
        }
        const token = user.createJWT()
        return res.status(StatusCodes.OK).send({ user: { name: user.name }, token })
    }).catch(err => {
        return res.status(500).send({
            message: err
        })
    })
}
const getAuthUser = async (req, res) => {
    res.send(req.user)
}
const getAllUser = async (req, res) => {

    await User.find({})
        .then(user => {
            if (!user) {
                res.status(500).json({ message: `No Users` })
            }
            res.status(201).send(user)
        }).catch(err => {
            res.status(500).send({ message: err })
        })
}
const getUser = async (req, res) => {
    await User.findOne({
        _id: req.params.id,
    })
        .then(user => {
            if (!user) {
                res.status(500).json({ message: `No post wish id ${req.params.id}` })
            }
            res.status(201).send(user)
        }).catch(err => {
            res.status(500).send({ message: err })
        })
}
module.exports = {
    register,
    login,
    getAuthUser,
    getUser,
    getAllUser
}