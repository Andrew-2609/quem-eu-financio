import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { Candidato } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { Senador } from '../entities/senador-entity'
import { SenadorRepository } from '../repositories/senador-repository'

export class SenadorController {
  constructor(private readonly senadorRepository: SenadorRepository) {}

  async getAllByEstado(estado: string): Promise<Senador[]> {
    let senadoresByEstado: Senador[] = []
    const senadoresByEstadoRedis = await getRedis(`senadores-${estado}`)

    if (!senadoresByEstadoRedis) {
      const { candidatos } = await this.senadorRepository.getAllByEstado(estado)

      senadoresByEstado = candidatos.map(
        (candidato) => new Senador(estado, candidato)
      )

      setRedis(
        `senadores-${estado}`,
        JSON.stringify(senadoresByEstado) // define cache se não houver
      )
    } else {
      senadoresByEstado = JSON.parse(senadoresByEstadoRedis) // pega do cache
    }

    return senadoresByEstado
  }

  async getByEstadoAndNome(
    estado: string,
    nomeSenador: string
  ): Promise<Senador[]> {
    const senadores = await this.getAllByEstado(estado)
    return Candidato.searchByNome(nomeSenador, senadores)
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
        await this.senadorRepository.getFundaoByEstadoAndIdAndNumPartido(
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
