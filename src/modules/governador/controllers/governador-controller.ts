import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { Candidato } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { Governador } from '../entities/governador-entity'
import { GovernadorRepository } from '../repositories/governador-repository'

export class GovernadorController {
  constructor(private readonly governadorRepository: GovernadorRepository) {}

  async getAllByEstado(estado: string): Promise<Governador[]> {
    let governadoresByEstado: Governador[] = []
    const governadoresByEstadoRedis = await getRedis(`governadores-${estado}`)

    if (!governadoresByEstadoRedis) {
      const { candidatos } = await this.governadorRepository.getAllByEstado(
        estado
      )

      governadoresByEstado = candidatos.map(
        (candidato) => new Governador(estado, candidato)
      )

      setRedis(
        `governadores-${estado}`,
        JSON.stringify(governadoresByEstado) // define cache se não houver
      )
    } else {
      governadoresByEstado = JSON.parse(governadoresByEstadoRedis) // pega do cache
    }

    return governadoresByEstado
  }

  async getByEstadoAndNome(
    estado: string,
    nomeGovernador: string
  ): Promise<Governador[]> {
    const governadores = await this.getAllByEstado(estado)
    return Candidato.searchByNome(nomeGovernador, governadores)
  }

  async getFundaoByEstadoAndIdAndNumPartido(
    estado: string,
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoral> {
    let fundaoEleitoral: FundaoEleitoral
    const fundaoRedis = await getRedis(`fundao-${id}-${numPartido}-${estado}`)

    if (!fundaoRedis) {
      const fundaoFromDivulgaCand =
        await this.governadorRepository.getFundaoByEstadoAndIdAndNumPartido(
          estado,
          id,
          numPartido
        )

      fundaoEleitoral = new FundaoEleitoral(fundaoFromDivulgaCand)

      setRedis(
        `fundao-${id}-${numPartido}-${estado}`,
        JSON.stringify(fundaoEleitoral)
      ) // define cache se ainda não houver
    } else {
      fundaoEleitoral = JSON.parse(fundaoRedis) // pega do cache
    }

    return fundaoEleitoral
  }
}
