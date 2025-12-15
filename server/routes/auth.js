const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

// Configure Nodemailer with User Credentials
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "nandhakumarbm7@gmail.com",
        pass: "zkgwlgsfjyuxeytj"
    }
});

// Helper to generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via Email
router.post('/send-otp', async (req, res) => {
    try {
        const { identifier } = req.body;

        if (!identifier) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: identifier },
                    { patientId: identifier },
                    { doctorId: identifier },
                    { phone: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.email) {
            return res.status(400).json({ message: "No email address linked to this account." });
        }

        // Generate and Save OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send Email
        const mailOptions = {
            from: "nandhakumarbm7@gmail.com",
            to: user.email,
            subject: "Smart Health Login Verification",
            text: `Hello ${user.name},\n\nYour OTP for Smart Health Login is: ${otp}\n\nThis code expires in 10 minutes.\n\nRegards,\nTeam Smart Health`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Mail Error:", error);
                return res.status(500).json({ message: "Failed to send OTP email: " + error.message });
            } else {
                console.log("Mail sent:", info.response);
                const maskedEmail = user.email.replace(/(...)(.+)(@.+)/, "$1***$3");
                res.json({ message: `OTP sent to ${maskedEmail}`, status: 'pending' });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error sending OTP: " + (error.message || error) });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { identifier, code } = req.body;

        if (!identifier || !code) {
            return res.status(400).json({ message: "Identifier and OTP are required" });
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: identifier },
                    { patientId: identifier },
                    { doctorId: identifier },
                    { phone: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check OTP
        if (user.otp !== code) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check Expiry
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // OTP Valid: Clear usage and Login
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

        res.json({
            status: 'approved',
            user,
            token,
            message: "Login successful"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification failed" });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, phone, ...otherData } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        let doctorId = null;
        let patientId = null;
        if (role === 'doctor') {
            const count = await User.count({ where: { role: 'doctor' } });
            doctorId = `DOC${String(count + 1).padStart(3, '0')}`;
        } else {
            const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
            const randomSuffix = Math.random().toString(36).substring(2, 4);
            patientId = `${dateStr}${name.substring(0, 2).toLowerCase()}${randomSuffix}`;
        }

        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 8),
            role,
            phone,
            doctorId,
            patientId,
            ...otherData
        });

        // Send Welcome Email
        const mailOptions = {
            from: "nandhakumarbm7@gmail.com",
            to: email,
            subject: "Welcome to Smart Health!",
            text: `Welcome ${name}!\n\nRegistration Successful. Your ID is: ${role === 'doctor' ? doctorId : patientId}.\n\nKeep this safe for logging in.\n\nRegards,\nTeam Smart Health`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.error("Welcome Email Error:", err);
            else console.log("Welcome Email Sent:", info.response);
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            patientId,
            doctorId
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});


module.exports = router;
