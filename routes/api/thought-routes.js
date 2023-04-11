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
  //   "thoughtText": "Hello World",
  //   "username": "user1",
  //   "userId": "64349a162bf89ae98e474a89"
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

router.put("/:id", (req, res) => {
  Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((thought) => {
      res.send(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating thought");
    });
});

router.post("/:id/reactions/", (req, res) => {
  // example data
  // {
  //   "reactionText": "Nice Post!",
  //   "username": "johndoe"
  // }
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
