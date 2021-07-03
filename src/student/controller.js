const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  })
}

const getStudentCount = (req, res) => {
  pool.query(queries.getStudentCount, (error, results) => {
    if (error) throw error;

    res.status(200).json({count: results.rows[0].count})
  });
}

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows)
  });
}

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send({message: 'Email already exists.'})
    }

    // add student record when email doesn't exist
    pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
      if (error) throw error;

      res.status(201).send({message: 'Student record created successfully!'});
      console.log('Student created!');
    });
  })
}

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    // check if student actually exists
    const noStudentFound = !results.rows.length;

    if (noStudentFound) {
      res.send({message: 'Student does not exist in the databse!'})
    }

    // Delete student now
    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;

      res.status(200).send({message: 'Student removed successfully!'})
    })
  });
}

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  // check if email exists
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send({message: 'Student does not exists.'})
    }

    // update student record when id does exist
    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;

      res.status(200).send({message: 'Student record updated successfully!'});
    });
  });
}

module.exports = {
  getStudents,
  getStudentCount,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
}