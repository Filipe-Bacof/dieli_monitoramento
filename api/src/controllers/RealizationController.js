const RealizationRepository = require('../repositories/RealizationRepository');

class RealizationController {
  async index (_req, res) {
    const realizations = await RealizationRepository.findAll();
    return res.json(realizations);
  }

  async show (req, res) {
    const { id } = req.params

    try {
      const realization = await RealizationRepository.findById(id)

      if (!realization)
        return res.status(400).json({ message: 'Realização de serviço não encontrada.' })

      return res
        .status(200)
        .json({ message: 'Realização de serviço encontrada com sucesso', realization })

    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Realização de serviço não encontrada.' })
    }
  }

  async create (req, res) {
    const { person, job, date } = req.body

    if (!person || !job || !date) {
      return res
        .status(422)
        .json({ message: 'Estão faltando campos obrigatórios para o cadastro' })
    }

    try {
      const realizarionExist = await RealizationRepository.findUnique({ person, job, date })

      if (realizarionExist.length > 0)
        return res
          .status(404)
          .json({ message: 'Essa realização de serviço já foi informada.' })

      const result = await RealizationRepository.create({ person, job, date })
  
      return res
        .status(200)
        .json({ message: 'Realização de serviço registrada com sucesso', result })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Houve um problema ao cadastrar essa realização de serviço.' })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const { person, job, date } = req.body

    if (!person || !job || !date) {
      return res
        .status(422)
        .json({ message: 'Informe a pessoa, tarefa e data que deseja atualizar' })
    }

    try {
      const findById = await RealizationRepository.findById(id);
      if (!findById)
        return res
          .status(404)
          .json({ message: 'Essa realização de serviço não foi encontrada.' })

      const realizarionExist = await RealizationRepository.findUnique({ person, job, date })

      if (realizarionExist.length > 0)
        return res
          .status(404)
          .json({ message: 'Essa realização de serviço já foi informada.' })

    } catch (error) {
      console.log(error)
      return res
        .status(404)
        .json({ message: 'Erro! Essa realização de serviço não foi encontrada.' })
    }

    await RealizationRepository.findByIdAndUpdate(id, person, job, date)

    const realizationNew = await RealizationRepository.findById(id)

    return res
      .status(200)
      .json({ message: 'Realização de serviço atualizada com sucesso.', realizationNew })
  }

  async deleteRealization (req, res) {
    const { id } = req.params

    try {
      const realization = await RealizationRepository.findById(id)

      if (!realization) {
        return res
          .status(404)
          .json({ message: 'Esta realização de serviço não foi encontrada.' })
      }

      await RealizationRepository.delete(id)

      return res
        .status(200)
        .json({ message: 'Realização de serviço deletada com sucesso.' })

    } catch (error) {
      console.error('Erro durante a exclusão da realização de serviço:', error)
      return res
        .status(500)
        .json({ message: 'Ocorreu um erro durante a exclusão da realização de serviço.' })
    }
  }
}

module.exports = new RealizationController()