const http = require('http');
const fs = require('fs');
const path = require('path');

const databaseFile = process.argv[2];

// Helper function to read and process the CSV file
function countStudents(database) {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1).map((line) => line.split(',')).filter((fields) => fields.length === 4);

      const studentCount = students.length;
      const fields = {};

      students.forEach((student) => {
        const field = student[3];
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(student[0]);
      });

      const result = [
        Number of students: ${studentCount},
      ];

      for (const [field, names] of Object.entries(fields)) {
        result.push(Number of students in ${field}: ${names.length}. List: ${names.join(', ')});
      }

      resolve(result.join('\n'));
    });
  });
}

// HTTP server logic
const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    try {
      const studentData = await countStudents(databaseFile);
      res.end(studentData);
    } catch (err) {
      res.end(err.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245);

// Export the app variable
module.exports = app;
