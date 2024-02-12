
const users = [
    /* ... */
  ];
  
  const database = require("../../database");

const getUsers = (req, res) => {
    database
      .query("SELECT * FROM users")
      .then(([users]) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    database
      .query("SELECT * FROM users WHERE id = ?", [id])
      .then(([users]) => {
        if (users.length > 0) {
          res.status(200).json(users[0]);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        const userId = result.insertId;
        res.status(201).send({ id: userId });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
      });
  };
  


  
module.exports = {
    getUsers,
    getUserById,
    postUser,
};
