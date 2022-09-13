import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { CandidatoFromDivulgacand } from '@/modules/common/candidato'
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
      presidenciaveis = await this.adicionarFundosDosCandidatos(candidatos)
      setRedis('presidenciaveis', JSON.stringify(presidenciaveis)) // set cache if not setted
    } else {
      presidenciaveis = JSON.parse(presidenciaveisRedis) // get from cache
    }

    return presidenciaveis
  }

  async getByNome(nomePresidente: string): Promise<Presidente[]> {
    const presidenciaveis = await this.getAll()

    const regex = new RegExp(nomePresidente.toLowerCase(), 'gi')

    const presidenciaveisProcurados = presidenciaveis.filter((presidenciavel) =>
      presidenciavel.nomeCompleto.toLowerCase().match(regex)
    )

    return presidenciaveisProcurados
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
  ): Promise<Presidente[]> {
    return await Promise.all(
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
