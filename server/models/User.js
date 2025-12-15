const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('patient', 'doctor'),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: '/placeholder.svg'
    },
    // Doctor specific fields
    hospital: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: { // Location/Address
        type: DataTypes.STRING,
        allowNull: true
    },
    doctorId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: true
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idProof: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Doctor Gender (using the shared gender field or duplicated if needed, but shared is better)
    // Patient specific fields
    patientId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adhaar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Extended Patient Fields
    alternativePhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bloodGroup: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    height: {
        type: DataTypes.STRING, // e.g., "175 cm"
        allowNull: true
    },
    weight: {
        type: DataTypes.STRING, // e.g., "70 kg"
        allowNull: true
    },
    // OTP Fields
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = User;
