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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let dados = req.body;

    mailOptions = {
        from: dados.n._email,
        to: process.env.TO,
        subject: "Portifólio | " + dados.n._assunto,
        text: `
            Nome: ${dados.n._nome}
            Telefone : ${dados.n._telefone}
            E-Mail : ${dados.n._email}
            Conteudo: ${dados.n._conteudo}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.json(500)
        } else {
            res.json("Email enviado")
            console.log('Email enviado: ' + info.response);
        }
    })
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor Online")
})
