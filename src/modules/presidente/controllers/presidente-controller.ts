import { CandidatoFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { Presidente } from '../entities/presidente-entity'
import { PresidenteRepository } from '../repositories/data/presidente-repository'

export class PresidenteController {
  constructor(private readonly presidenteRepository: PresidenteRepository) {}

  async getAll(): Promise<Presidente[]> {
    const { candidatos } = await this.presidenteRepository.getAll()
    const presidenciaveis = await this.adicionarFundosDosCandidatos(candidatos)
    return presidenciaveis
  }

  async getByNome(nomePresidente: string): Promise<Presidente[]> {
    const candidatos = await this.presidenteRepository.getByNome(nomePresidente)
    const presidenciaveis = await this.adicionarFundosDosCandidatos(candidatos)
    return presidenciaveis
  }

  async getFundaoByIdAndNumPartido(
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoral> {
    const fundaoFromDivulgaCand =
      await this.presidenteRepository.getFundaoByIdAndNumPartido(id, numPartido)

    return new FundaoEleitoral(fundaoFromDivulgaCand)
  }

  private async adicionarFundosDosCandidatos(
    candidatosFromDivulgacand: CandidatoFromDivulgacand[]
  ) {
    return Promise.all(
      candidatosFromDivulgacand.map(async (candidato): Promise<Presidente> => {
        const presidenciavel = new Presidente(candidato)

        // get the data from getFundaoByIdAndNumPartido and set to presidenciavel.fundos
        presidenciavel.fundos = await this.getFundaoByIdAndNumPartido(
          presidenciavel.id,
          presidenciavel.numeroPartido
        )

        return presidenciavel
      })
    )
  }
}
