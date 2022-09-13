import { Presidente } from '../entities/presidente-entity'
import { PresidenteRepository } from '../repositories/data/presidente-repository'

export class PresidenteController {
  constructor(private readonly presidenteRepository: PresidenteRepository) {}

  async getAll(): Promise<Presidente[]> {
    const { data } = await this.presidenteRepository.getAll()

    const presidenciaveis = data.candidatos.map(
      (candidato) => new Presidente(candidato)
    )

    return presidenciaveis
  }
}
