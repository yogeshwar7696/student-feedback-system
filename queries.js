const createTable = `
  CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    feedback TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const insertFeedback = 'INSERT INTO feedback (student_name, roll_number, course, instructor, rating, feedback) VALUES (?, ?, ?, ?, ?, ?)';

module.exports = {
  createTable,
  insertFeedback
};
