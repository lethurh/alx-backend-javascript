const http = require('http');
const fs = require('fs');
const path = require('path');

function countStudents(database) {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.trim().split('\n').filter(line => line);
      const headers = lines.shift().split(',');

      const fieldIdx = headers.indexOf('field');
      const firstNameIdx = headers.indexOf('firstname');

      const studentsByField = {};
      const allStudents = [];

      lines.forEach((line) => {
        const studentData = line.split(',');
        if (studentData.length >= headers.length) {
          const field = studentData[fieldIdx];
          const firstName = studentData[firstNameIdx];

          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }

          studentsByField[field].push(firstName);
          allStudents.push(firstName);
        }
      });

      let output = 'Number of students: ${allStudents.length}\n';
      for (const [field, students] of Object.entries(studentsByField)) {
        output += 'Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n';
      }

      resolve(output.trim());
    });
  });
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const database = process.argv[2];

    if (!database) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Database file not provided');
      return;
    }

    countStudents(database)
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(This is the list of our students\n${data});
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.message);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
