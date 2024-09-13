const Job = require('../models/JobSchema')

class JobRepository {
  async findAll() {
    const jobs = await Job.find().sort({ updatedAt: -1 }).lean().exec()

    return jobs
  }

  async findById(id) {
    const job = await Job.findOne({ _id: id }).lean().exec()

    return job
  }
  
  async findByTitle(title) {
    const job = await Job.find({ title }).lean().exec()

    return job
  }

  async findByIdAndUpdate(id, title) {
    const job = await Job.findOneAndUpdate(
      { _id: id },
      {
        title,
        updatedAt: Date.now(),
      },
    )

    await job.save()
    return job
  }

  async create(title) {
    const job = new Job({ title })

    await job.save()

    return job
  }

  async delete(id) {
    return await Job.findOneAndDelete({ _id: id })
  }
}

module.exports = new JobRepository()