const nodemailer = require("nodemailer");
require('dotenv').config()
const Order = require('./model')
var Mailgen = require('mailgen');
const { connect } = require("mongoose");

const DemoMail = async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        res.json({ message: "invalid submission" })
    }
    else {

        const config = {
            service: "gmail",
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }


        const transporter = nodemailer.createTransport(config);


        // Configure mailgen by setting a theme and your product info
        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Mailgen',
                link: 'https://mailgen.js/'
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            }
        });

        var mailGen = {
            body: {
                name: name,
                intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                table: {
                    data: [
                        {
                            name: name,
                            email: email,
                            token: "123"
                        }]
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        const response = {
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: mailGenerator.generate(mailGen), // html body
        }


        try {
            await transporter.sendMail(response);


            res.json({ message: "check your email" })
        } catch (error) {
            res.json({ error })
        }
    }

}



const AddOrder = async (req, res) => {

    const { Items, Totalbill, Customername, Customeremail, Customeraddress, Customercontact } = req.body
    if (!Items || !Totalbill || !Customeraddress || !Customercontact || !Customername || !Customeremail) {
        res.json({ message: "Invalid" })
    }

    else {

        try {
            await connect(process.env.MONGO_URL);
            const order = await Order.create({ Items, Totalbill, Customername, Customeremail, Customeraddress, Customercontact })


            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    // Appears in header & footer of e-mails
                    name: 'Mailgen',
                    link: 'https://mailgen.js/'
                    // Optional product logo
                    // logo: 'https://mailgen.js/img/logo.png'
                }
            });


            await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: Customeremail, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: mailGenerator.generate({
                    body: {
                        name: Customername,
                        intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                        table: {
                            data: [
                                {
                                    name: Customername,
                                    email: Customeremail,
                                    TrackingId: order._id,
                                    contact: Customercontact,
                                    Address: Customeraddress,
                                    

                                }]
                        },
                        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                    }
                }), // html body
            });

            res.json({
                message: "Order Place Successfully",
                TrackingId: order._id
            })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}


const AllOrders = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const orders = await Order.find()
        res.json({
            orders
        })
    }

    catch (error) {
        res.json({ message: error.message })

    }
}

const OrderById = async (req, res) => {
    const { _id } = req.params

    try {
        await connect(process.env.MONGO_URL)
        const orders = await Order.find({ _id })
        res.json({
            orders
        })
    }

    catch (error) {
        res.json({
            message: error.message
        })

    }
}


const UpdateOrder = async (req, res) => {
    const { Message,Status,_id } = req.body

    const filter = {_id}
    const update = {Message,Status}

    try {
        await connect(process.env.MONGO_URL)
        const orders = await Order.findOneAndUpdate(filter,update)
        res.json({
            message: "Updated successfully",
            orders
        })
    } 
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}


module.exports = { DemoMail, AddOrder, AllOrders, OrderById,UpdateOrder }