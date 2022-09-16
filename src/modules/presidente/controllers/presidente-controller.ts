import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { Candidato } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { Presidente } from '../entities/presidente-entity'
import { PresidenteRepository } from '../repositories/presidente-repository'

export class PresidenteController {
  constructor(private readonly presidenteRepository: PresidenteRepository) {}

  async getAll(): Promise<Presidente[]> {
    let presidenciaveis: Presidente[] = []
    const presidenciaveisRedis = await getRedis('presidenciaveis')

    if (!presidenciaveisRedis) {
      const { candidatos } = await this.presidenteRepository.getAll()
      presidenciaveis = candidatos.map((candidato) => new Presidente(candidato))
      setRedis('presidenciaveis', JSON.stringify(presidenciaveis)) // define cache se ainda não houver
    } else {
      presidenciaveis = JSON.parse(presidenciaveisRedis) // pega do cache
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
    let fundaoEleitoral: FundaoEleitoral
    const fundaoRedis = await getRedis(`fundao-${id}-${numPartido}`)

    if (!fundaoRedis) {
      const fundaoFromDivulgaCand =
        await this.presidenteRepository.getFundaoByIdAndNumPartido(
          id,
          numPartido
        )

      fundaoEleitoral = new FundaoEleitoral(fundaoFromDivulgaCand)

      setRedis(`fundao-${id}-${numPartido}`, JSON.stringify(fundaoEleitoral)) // define cache se ainda não houver
    } else {
      fundaoEleitoral = JSON.parse(fundaoRedis) // pega do cache
    }

    return fundaoEleitoral
  }
}
