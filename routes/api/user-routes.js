const User = require("../../models/User");

const ObjectID = require("mongodb").ObjectId;

const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    User.find({})
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving users");
      });
  })
  .post((req, res) => {
    // Post Example:
    // {
    //     "username": "foo",
    //     "email": "bar@baz.com"  // Email format only
    // }
    User.create(req.body)
      .then(() => {
        res.send("Success");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error creating user");
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving user with id " + req.params.id);
      });
  })
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send("User with id " + req.params.id + " deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting user with id " + req.params.id);
      });
  });

router
  .route("/:id/friends/:friendId")
  .post((req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this userId" });
          return;
        }
        // add userId to friendId's friend list
        User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $addToSet: { friends: req.params.userId } },
          { new: true, runValidators: true }
        )
          .then((dbUserData2) => {
            if (!dbUserData2) {
              res
                .status(404)
                .json({ message: "No user found with this friendId" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  })
  .delete((req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.id } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this friendId" });
          return;
        }
        // remove friendId from userId's friend list
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.params.friendId } },
          { new: true, runValidators: true }
        )
          .then((dbUserData2) => {
            if (!dbUserData2) {
              res.status(404).json({ message: "No user found with this id" });
              return;
            }
            res.json(dbUserData2);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

module.exports = router;
