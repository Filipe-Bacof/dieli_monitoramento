const Complaint = require('../models/ComplaintSchema')

class ComplaintRepository {
  async findAll() {
    const complaints = await Complaint.find().sort({ updatedAt: -1 }).lean().exec()

    return complaints
  }

  async findById(id) {
    const complaint = await Complaint.findOne({ _id: id }).lean().exec()

    return complaint
  }

  async findByIdAndUpdate(id, { person, job, complaint }) {
    const result = await Complaint.findOneAndUpdate(
      { _id: id },
      {
        person,
        job,
        complaint,
        updatedAt: Date.now(),
      },
    )

    await result.save()
    return result
  }

  async create({ person, job, complaint }) {
    const result = new Complaint({ person, job, complaint })

    await result.save()

    return result
  }

  async delete(id) {
    return await Complaint.findOneAndDelete({ _id: id })
  }
}

module.exports = new ComplaintRepository()