import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { Candidato, CandidatoFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { Presidente } from '../entities/presidente-entity'
import { PresidenteRepository } from '../repositories/data/presidente-repository'

export class PresidenteController {
  constructor(private readonly presidenteRepository: PresidenteRepository) {}

  async getAll(): Promise<Presidente[]> {
    let presidenciaveis: Presidente[] = []
    const presidenciaveisRedis = await getRedis('presidenciaveis')

    if (!presidenciaveisRedis) {
      const { candidatos } = await this.presidenteRepository.getAll()
      presidenciaveis = await this.adicionarFundosDosCandidatosERetornalos(
        candidatos
      )
      setRedis('presidenciaveis', JSON.stringify(presidenciaveis)) // set cache if not setted
    } else {
      presidenciaveis = JSON.parse(presidenciaveisRedis) // get from cache
    }

    return presidenciaveis
  }

  async getByNome(nomePresidente: string): Promise<Presidente[]> {
    const presidenciaveis = await this.getAll()
    return Candidato.searchByNome(nomePresidente, presidenciaveis)
  }

  async getFundaoByIdAndNumPartido(
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoral> {
    const fundaoFromDivulgaCand =
      await this.presidenteRepository.getFundaoByIdAndNumPartido(id, numPartido)

    return new FundaoEleitoral(fundaoFromDivulgaCand)
  }

  private async adicionarFundosDosCandidatosERetornalos(
    candidatosFromDivulgacand: CandidatoFromDivulgacand[]
  ): Promise<Presidente[]> {
    return await Promise.all(
      candidatosFromDivulgacand.map(async (candidato): Promise<Presidente> => {
        const presidenciavel = new Presidente(candidato)

        // get the data from getFundaoByIdAndNumPartido and set to presidenciavel.fundos
        presidenciavel.fundos = await this.getFundaoByIdAndNumPartido(
          presidenciavel.id,
          presidenciavel.numero
        )

        return presidenciavel
      })
    )
  }
}
