const express = require('express');
const Gif = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
	Gif.find({}).then((gifs) => {
		res.json(gifs);
	});
});

router.get('/:id', async (req, res) => {
	try {
		const gif = await Gif.findById(req.params.id);
		res.json(gif);
	} catch(err) {
		return err;
	};
});

router.post('/', (req, res) => {
	Gif.create(req.body).then((gif) => {
		res.json(gif);
	});
});

router.put('/:id', (req, res) => {
	Gif.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
		(gif) => res.json(gif)
	);
});

router.delete('/:id', (req, res) => {
	Gif.findOneAndDelete({ _id: req.params.id }, req.body).then((gif) =>
		res.json(gif)
	);
});

module.exports = router;
