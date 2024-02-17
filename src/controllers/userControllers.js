
const users = [
    /* ... */
  ];
  
  const database = require("../../database");



  const deleteUser = (req,res) => {
    const id = parseInt(req.params.id);

    database
    .query("delete from users where id = ?" , [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


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
  
  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language} = req.body;
  
    database
      .query(
        "update movies set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
        [firstname, lastname, email, city, language ]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  

  
module.exports = {
    deleteUser,
    getUsers,
    getUserById,
    postUser,
    updateUser,
};
