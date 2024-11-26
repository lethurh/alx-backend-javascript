const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file content synchronously
    const data = fs.readFileSync(path, 'utf-8');
    
    // Split data into lines, filtering out any empty lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Remove the header line (first line)
    const headers = lines.shift().split(',');

    // Define a map to store students by field
    const fields = {};

    // Iterate over each line to process student data
    lines.forEach((line) => {
      const student = line.split(',');

      // Ensure the line is not malformed (matches header length)
      if (student.length === headers.length) {
        const firstName = student[0];
        const field = student[student.length - 1];

        // If the field is not present in the map, initialize it
        if (!fields[field]) {
          fields[field] = [];
        }
        // Add student to the field
        fields[field].push(firstName);
      }
    });

    // Calculate the total number of students
    const totalStudents = Object.values(fields).reduce((acc, students) => acc + students.length, 0);
    
    console.log('Number of students: ${totalStudents}');

    // Print each field with the number of students and list of names
    for (const [field, students] of Object.entries(fields)) {
      console.log('Number of students in ${field}: ${students.length}. List: ${students.join(', ')}');
    }
  } catch (error) {
    // Handle the case where the file can't be read
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
