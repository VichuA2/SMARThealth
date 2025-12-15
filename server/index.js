const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User'); // Ensure User model is loaded
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
console.log('Configuring middleware with 500mb limit...');
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

const authRoutes = require('./routes/auth');
app.post("/sendEmail",(req,res){})
//app.use('/api/auth', authRoutes);

// Serve external medical reports
app.use('/external-reports', express.static('E:/medical reports'));

// Database Connection
sequelize.sync({ alter: true })
  .then(() => console.log('MySQL database connected and synced with alter:true'))
  .catch(err => console.error('MySQL connection error:', err));

app.get('/', (req, res) => {
  res.send('SmartHealth Sync Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
