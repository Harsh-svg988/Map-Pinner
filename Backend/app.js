const express = require('express');
const mongoose = require('mongoose');
const storyRoutes = require('./routes/storyRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb://localhost/map-memories', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/api/stories', storyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
