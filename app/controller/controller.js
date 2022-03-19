const db = require("../models");
const Notes = db.notes;
const Op = db.Sequelize.Op;
// Create and Save a new Note
exports.create = (req, res) => {
  
};
// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  
};
// Find a single Note with an id
exports.findOne = (req, res) => {
  
};
// Update a Note by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Notes from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Notes
exports.findAllPublished = (req, res) => {
  
};

// Create a new object
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Note
    const notes = {
      name: req.body.name,
      age: req.body.age,
      message: req.body.message,
      createDate: req.body.createDate ? req.body.createDate : false
    };
    // Save Note in the database
    Notes.create(notes)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the note."
        });
      });
  };

// Retreive objects
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Notes.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Notes."
        });
      });
  };

// Retreive a single object
exports.findOne = (req, res) => {
    const id = req.params.id;
    Notes.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Notes with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Notes with id=" + id
        });
      });
  };

// Update Notes
exports.update = (req, res) => {
    const id = req.params.id;
    Notes.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Note was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update note with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating note with id=" + id
        });
      });
  };

// Delete an object
exports.delete = (req, res) => {
    const id = req.params.id;
    Notes.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Note was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete note with id=${id}. Maybe note was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete note with id=" + id
        });
      });
  };
// Delete all objects
exports.deleteAll = (req, res) => {
    Notes.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Notes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all notes."
        });
      });
  };

// Find all objects by conditon
exports.findAllByCreatedDate = (req, res) => {
    Notes.findAll({ where: { createDate: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving notes."
        });
      });
  };