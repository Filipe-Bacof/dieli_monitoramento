const mongoose = require('mongoose')

const { Schema } = mongoose

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Person = mongoose.model('Person', personSchema)

module.exports = Person