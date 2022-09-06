const { User, Thought } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((thoughtData) => {
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get one thought
    getSingleThought(req, res) {
        Thought.findOne(
            { _id: req.params.thoughtId }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought exists with this id!' });
                }

                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thoughtData._id } },
                    { runValidators: true, new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user exists with this id! Thought created' });
                }

                res.json({ message: 'Thought has been created' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughtData) => {
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought exists with this id!' });
            }

            res.json(thoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought exists with this id!' });
                }

                res.json({ message: 'Thought has been deleted' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Create a reaction
    createReaction(req, res) {
       Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought exists with this id!' });
                }

                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
             { _id: req.params.thoughtId },
             { $pull: { reactions: { reactionId: req.params.reactionId } } },
             { runValidators: true, new: true }
         )
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought exists with this id!' });
                }

                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }        
}

module.exports = thoughtController;