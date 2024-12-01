const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf-8');
    
    // Split the file into lines and filter out empty ones
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Extract headers and data
    const headers = lines[0].split(',');
    const records = lines.slice(1).map((line) => line.split(','));

    // Group students by field
    const studentsByField = {};
    for (const record of records) {
      if (record.length === headers.length) {
        const field = record[headers.length - 1]; // Assuming last column is the field
        const firstName = record[0];
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstName);
      }
    }

    // Log total number of students
    const totalStudents = Object.values(studentsByField).reduce((sum, students) => sum + students.length, 0);
    console.log(Number of students: ${totalStudents});

    // Log students count and list per field
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(Number of students in ${field}: ${students.length}. List: ${students.join(', ')});
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
