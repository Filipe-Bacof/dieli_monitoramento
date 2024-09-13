const Realization = require('../models/RealizationSchema')

class RealizationRepository {
  async findAll() {
    const realizations = await Realization.find().sort({ updatedAt: -1 }).lean().exec()

    return realizations
  }

  async findById(id) {
    const realization = await Realization.findOne({ _id: id }).lean().exec()

    return realization
  }
  
  async findUnique({ person, job, date }) {
    const realization = await Realization.find({ person, job, date }).lean().exec()

    return realization
  }

  async findByIdAndUpdate(id, person, job, date) {
    const result = await Realization.findOneAndUpdate(
      { _id: id },
      {
        person,
        job,
        date,
        updatedAt: Date.now(),
      },
    )

    await result.save()
    return result
  }

  async create({ person, job, date }) {
    const result = new Realization({ person, job, date })

    await result.save()

    return result
  }

  async delete(id) {
    return await Realization.findOneAndDelete({ _id: id })
  }
}

module.exports = new RealizationRepository()