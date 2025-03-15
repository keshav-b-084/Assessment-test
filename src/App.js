document.addEventListener('DOMContentLoaded', function() {
  const studentForm = document.getElementById('student-form');
  const studentsList = document.getElementById('students');

  // Function to fetch students from the server
  function fetchStudents() {
      fetch('http://localhost:3000/students')
          .then(response => response.json())
          .then(students => {
              studentsList.innerHTML = '';
              students.forEach(student => {
                  const li = document.createElement('li');
                  li.textContent = `Name: ${student.name}, Email: ${student.email}, Age: ${student.age}`;
                  studentsList.appendChild(li);
              });
          })
          .catch(err => console.error('Error fetching students:', err));
  }

  // Handle form submission
  studentForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;

      const studentData = {
          name,
          email,
          age
      };

      fetch('http://localhost:3000/students', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData)
      })
      .then(response => response.json())
      .then(data => {
          fetchStudents(); // Refresh the student list after adding a new student
          studentForm.reset(); // Reset the form
      })
      .catch(error => console.error('Error adding student:', error));
  });

  // Initial fetch of students
  fetchStudents();
});
