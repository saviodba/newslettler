require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWRD
    },
    tls: { rejectUnauthorized: false }
});
let mailOptions = {}
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', (req, res) => {
    let dados = req.body;

    mailOptions = {
        from: dados.email,
        to: 'saviodesenv@gmail.com',
        subject: dados.assunto,
        text: `
            Nome: ${dados.nome}
            Telefone : ${dados.telefone}
            E-Mail : ${dados.email}
            Conteudo: ${dados.conteudo}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.json(400)
        } else {
            res.json(200)
            console.log('Email enviado: ' + info.response);
        }
    })
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor subiu...")
})
