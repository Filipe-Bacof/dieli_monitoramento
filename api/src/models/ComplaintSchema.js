const mongoose = require('mongoose')

const { Schema } = mongoose

const complaintSchema = new Schema(
  {
    person: {
      type: mongoose.ObjectId,
      required: false,
      ref: 'Person',
    },
    job: {
      type: mongoose.ObjectId,
      required: false,
      ref: 'Job',
    },
    complaint: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Complaint = mongoose.model('Complaint', complaintSchema)

module.exports = Complaint