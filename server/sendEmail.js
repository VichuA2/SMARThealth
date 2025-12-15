const nodemailer = require("nodemailer");

app.post("/sendEmail", (req, res) => {
    const sender = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "nandhakumarbm7@gmail.com",
            pass: "zkgwlgsfjyuxeytj", // app password
        },
    });

    const composeMail = {
        from: "nandhakumarbm7@gmail.com",
        to: "22it026@nandhaengg.org",
        subject: "Greeting!",
        text: "Hello Google CEO Nandhakumar",
    };

    sender.sendMail(composeMail, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Email failed" });
        }

        res.status(200).json({ message: "Mail sent successfully" });
    });
});