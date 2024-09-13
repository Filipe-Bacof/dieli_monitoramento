const mongoose = require('mongoose')

const { Schema } = mongoose

const realizationSchema = new Schema(
  {
    job: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Job',
    },
    person: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Person',
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Realization = mongoose.model('Realization', realizationSchema)

module.exports = Realization