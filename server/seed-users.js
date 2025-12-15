const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const users = [
    {
        name: 'divith',
        email: 'divithganesandhana@gmail.com',
        password: '123456',
        role: 'patient',
        patientId: 'PAT-SEED-001',
        adhaar: '0000-0000-0000',
        phone: '1234567890'
    },
    {
        name: 'vishnu',
        email: 'vishnuarumugam0207@gmail.com',
        password: 'Ab_2-15n',
        role: 'doctor',
        doctorId: 'DOC-SEED-001',
        hospital: 'General Hospital',
        address: '123 Health St'
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        for (const userData of users) {
            // Upsert user (update if exists, insert if not)
            const result = await User.findOneAndUpdate(
                { email: userData.email },
                userData,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`✅ Processed user: ${result.name} (${result.role})`);
        }

        console.log('Seeding completed successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    });
