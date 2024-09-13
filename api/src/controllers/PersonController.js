const PersonRepository = require('../repositories/PersonRepository');

class PersonController {
  async index (_req, res) {
    const persons = await PersonRepository.findAll();
    return res.json(persons);
  }

  async show (req, res) {
    const { id } = req.params

    try {
      const person = await PersonRepository.findById(id)

      if (!person)
        return res.status(400).json({ message: 'Pessoa não encontrada.' })

      return res
        .status(200)
        .json({ message: 'Pessoa encontrada com sucesso', person })

    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Pessoa não encontrada.' })
    }
  }

  async create (req, res) {
    const { name } = req.body

    if (!name) {
      return res
        .status(422)
        .json({ message: 'É obrigatório informar o nome para o cadastro' })
    }

    try {
      const isAlreadyRegistered = await PersonRepository.findByName(name)
      if (isAlreadyRegistered)
        return res
          .status(422)
          .json({ message: 'Você já cadastrou essa pessoa.' })
  
      const person = await PersonRepository.create(name)
  
      return res
        .status(200)
        .json({ message: 'Pessoa registrada com sucesso', person })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Houve um problema ao cadastrar essa pessoa.' })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const { name } = req.body

    try {
      const isAlreadyRegistered = await PersonRepository.findByName(name)
      if (isAlreadyRegistered)
        return res
          .status(422)
          .json({ message: 'Você já cadastrou outra pessoa com esse nome.' })

      const person = await PersonRepository.findById(id)

      if (!person)
        return res
          .status(404)
          .json({ message: 'Essa pessoa não foi encontrada.' })

    } catch (error) {
      console.log(error)
      return res
        .status(404)
        .json({ message: 'Erro! Essa pessoa não foi encontrada.' })
    }

    await PersonRepository.findByIdAndUpdate(id, name)

    const personNew = await PersonRepository.findById(id)

    return res
      .status(200)
      .json({ message: 'Pessoa atualizada com sucesso.', personNew })
  }
}

module.exports = new PersonController()