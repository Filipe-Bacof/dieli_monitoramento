const mongoose = require('mongoose')

const { Schema } = mongoose

const functionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Job = mongoose.model('Job', functionSchema)

module.exports = Job