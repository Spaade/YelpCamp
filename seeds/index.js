const mongoose = require('mongoose')

const Campground = require('../models/campgrounds')
const Cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error: '))
db.once('open', () => {
  console.log('Database connected.')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const randomCity = Math.floor(Math.random() * 1000)
    const camp = new Campground({
      location: `${Cities[randomCity].city}, ${Cities[randomCity].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
