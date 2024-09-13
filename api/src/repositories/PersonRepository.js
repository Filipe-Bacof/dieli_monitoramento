const Person = require('../models/PersonSchema')

class PersonRepository {
  async findAll() {
    const persons = await Person.find().sort({ updatedAt: -1 }).lean().exec()

    return persons
  }

  async findById(id) {
    const person = await Person.findOne({ _id: id }).lean().exec()

    return person
  }

  async findByIdAndUpdate(id, name) {
    const person = await Person.findOneAndUpdate(
      { _id: id },
      {
        name,
        updatedAt: Date.now(),
      },
    )

    await person.save()
    return person
  }

  async create(name) {
    const person = new Person({ name })

    await person.save()

    return person
  }

  async delete(id) {
    return await Person.findOneAndDelete({ _id: id })
  }
}

module.exports = new PersonRepository()