const ComplaintRepository = require('../repositories/ComplaintRepository');

class ComplaintController {
  async index (_req, res) {
    const complaints = await ComplaintRepository.findAll();
    return res.json(complaints);
  }

  async show (req, res) {
    const { id } = req.params

    try {
      const complaint = await ComplaintRepository.findById(id)

      if (!complaint)
        return res.status(400).json({ message: 'Reclamação não encontrada.' })

      return res
        .status(200)
        .json({ message: 'Reclamação encontrada com sucesso', complaint })

    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Reclamação não encontrada.' })
    }
  }

  async create (req, res) {
    const { person, job, complaint } = req.body

    if (!complaint) {
      return res
        .status(422)
        .json({ message: 'É obrigatório informar o texto para a inserção' })
    }

    try {
      const result = await ComplaintRepository.create({ 
        ...(person && { person }),
        ...(job && { job }),
        complaint
      })
  
      return res
        .status(200)
        .json({ message: 'Reclamação registrada com sucesso', result })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Houve um problema ao cadastrar essa reclamação.' })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const { person, job, complaint } = req.body

    if (!person && !job && !complaint) {
      return res
        .status(422)
        .json({ message: 'Informe pelo menos um dos campos que deseja atualizar' })
    }

    try {
      const complaintExist = await ComplaintRepository.findById(id)

      if (!complaintExist)
        return res
          .status(404)
          .json({ message: 'Essa reclamação não foi encontrada.' })

    } catch (error) {
      console.log(error)
      return res
        .status(404)
        .json({ message: 'Erro! Essa reclamação não foi encontrada.' })
    }

    await ComplaintRepository.findByIdAndUpdate(id, {
      ...(person && { person }),
      ...(job && { job }),
      ...(complaint && { complaint }),
    })

    const complaintNew = await ComplaintRepository.findById(id)

    return res
      .status(200)
      .json({ message: 'Pessoa atualizada com sucesso.', complaintNew })
  }
}

module.exports = new ComplaintController()