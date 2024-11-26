const Story = require('../models/Story.js');

exports.getStories = async (req, res) => {
  const stories = await Story.find();
  res.json(stories);
};

exports.createStory = async (req, res) => {
  const { title, description, marker } = req.body;
  const story = new Story({ title, description, marker });
  await story.save();
  res.status(201).json(story);
};

exports.deleteStory = async (req, res) => {
  const { id } = req.params;
  await Story.findByIdAndDelete(id);
  res.json({ message: 'Story deleted' });
};
