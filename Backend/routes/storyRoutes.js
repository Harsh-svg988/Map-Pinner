const express = require('express');
const storyController = require('../controllers/storyController');

const router = express.Router();

router.get('/', storyController.getStories);
router.post('/', storyController.createStory);
router.delete('/:id', storyController.deleteStory);

module.exports = router;
