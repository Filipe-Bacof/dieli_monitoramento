const JobRepository = require('../repositories/JobRepository');

class JobController {
  async index (_req, res) {
    const jobs = await JobRepository.findAll();
    return res.json(jobs);
  }

  async show (req, res) {
    const { id } = req.params

    try {
      const job = await JobRepository.findById(id)

      if (!job)
        return res.status(400).json({ message: 'Trabalho não encontrado.' })

      return res
        .status(200)
        .json({ message: 'Trabalho encontrado com sucesso', job })

    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Trabalho não encontrado.' })
    }
  }

  async create (req, res) {
    const { title } = req.body

    if (!title) {
      return res
        .status(422)
        .json({ message: 'É obrigatório informar o título para o cadastro' })
    }

    try {
      const isAlreadyRegistered = await JobRepository.findByTitle(title)
      if (isAlreadyRegistered)
        return res
          .status(422)
          .json({ message: 'Você já cadastrou esse trabalho.' })
  
      const job = await JobRepository.create(title)
  
      return res
        .status(200)
        .json({ message: 'Trabalho registrado com sucesso', job })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Houve um problema ao cadastrar esse trabalho.' })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const { title } = req.body

    try {
      const isAlreadyRegistered = await JobRepository.findByTitle(title)
      if (isAlreadyRegistered)
        return res
          .status(422)
          .json({ message: 'Você já cadastrou outro trabalho com esse título.' })

      const job = await JobRepository.findById(id)

      if (!job)
        return res
          .status(404)
          .json({ message: 'Esse trabalho não foi encontrada.' })

    } catch (error) {
      console.log(error)
      return res
        .status(404)
        .json({ message: 'Erro! Esse trabalho não foi encontrada.' })
    }

    await JobRepository.findByIdAndUpdate(id, title)

    const jobNew = await JobRepository.findById(id)

    return res
      .status(200)
      .json({ message: 'Trabalho atualizado com sucesso.', jobNew })
  }
}

module.exports = new JobController()