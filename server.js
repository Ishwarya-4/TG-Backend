const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Detail = require('./models/Details');
const uri = "mongodb+srv://Ishwarya:TouchGovernance@emaildetails.c2n3gcc.mongodb.net/?retryWrites=true&w=majority&appName=emailDetails";


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
// const detailSchema = new mongoose.Schema({
//   emailName: String,
//   sendDate: String,
//   region: String,
//   productGroup: String,
//   assignee: String,
//   crossovers: [String],
//   limitExceeded: Boolean,
//   regionCounts: {
//     WW: Number,
//     APJ: Number,
//     AMS: Number,
//     INTL: Number,
//   },
// });

// Create a model
// const Detail = mongoose.model('Detail', detailSchema);

// Add new detail
app.post('/api/details', async (req, res) => {
  try {
    const newDetail = new Detail(req.body);
    await newDetail.save();
    res.status(201).send(newDetail);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all details
app.get('/api/details', async (req, res) => {
  try {
    const details = await Detail.find();
    res.status(200).send(details);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete detail
app.delete('/api/details/:id', async (req, res) => {
  try {
    const detail = await Detail.findByIdAndDelete(req.params.id);
    if (!detail) {
      res.status(404).send();
    }
    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit detail
app.put('/api/details/:id', async (req, res) => {
  try {
    const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!detail) {
      res.status(404).send();
    }
    res.status(200).send(detail);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});