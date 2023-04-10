const Thought = require("../../models/Thought");

const router = require("express").Router();

router.get("/", (req, res) => {
  Thought.find({})
    .then((thoughts) => {
      res.send(thoughts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving thoughts");
    });
});

router.post("/", (req, res) => {
  // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  Thought.create(req.body)
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error creating thought");
    });
});

router.get("/:id", (req, res) => {
  Thought.findById(req.params.id)
    .then((thought) => {
      res.send(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving thought");
    });
});

router.post("/:id/reactions/", (req, res) => {
  Thought.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { reactions: req.body } }
  )
    .then((reaction) => {
      res.send(reaction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error posting reaction");
    });
});

router.delete("/:id/reactions/:reactionId", (req, res) => {
  Thought.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { reactions: { _id: req.params.reactionId } } }
  )
    .then((reaction) => {
      res.send(reaction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting reaction");
    });
});

router.delete("/:id", (req, res) => {
  Thought.findByIdAndDelete(req.params.id)
    .then((thought) => {
      res.send("Thought deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting thought");
    });
});

module.exports = router;
