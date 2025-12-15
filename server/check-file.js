const fs = require('fs');
const path = require('path');

const directory = 'E:/medical reports';
const filename = 'OMC Report Sample - Urgent Care - PA Supervision.pdf';
const fullPath = path.join(directory, filename);

console.log('Checking file access...');
console.log(`Directory: ${directory}`);
console.log(`Filename: ${filename}`);
console.log(`Full Path: ${fullPath}`);

if (fs.existsSync(fullPath)) {
    console.log('✅ File exists!');
} else {
    console.log('❌ File NOT found!');

    // List directory contents to see what's there
    if (fs.existsSync(directory)) {
        console.log('Directory contents:');
        fs.readdirSync(directory).forEach(file => {
            console.log(` - ${file}`);
        });
    } else {
        console.log('❌ Directory NOT found!');
    }
}
