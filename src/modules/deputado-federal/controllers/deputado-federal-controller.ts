import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { Candidato } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { DeputadoFederal } from '../entities/deputado-federal-entity'
import { DeputadoFederalRepository } from '../repositories/deputado-federal-repository'

export class DeputadoFederalController {
  constructor(
    private readonly deputadoFederalRepository: DeputadoFederalRepository
  ) {}

  async getAllByEstado(estado: string): Promise<DeputadoFederal[]> {
    let deputadosFederaisByEstado: DeputadoFederal[] = []
    const deputadosFederaisByEstadoRedis = await getRedis(
      `deputados-federais-${estado}`
    )

    if (!deputadosFederaisByEstadoRedis) {
      const { candidatos } =
        await this.deputadoFederalRepository.getAllByEstado(estado)

      deputadosFederaisByEstado = candidatos.map(
        (candidato) => new DeputadoFederal(estado, candidato)
      )

      setRedis(
        `deputados-federais-${estado}`,
        JSON.stringify(deputadosFederaisByEstado) // define cache se não houver
      )
    } else {
      deputadosFederaisByEstado = JSON.parse(deputadosFederaisByEstadoRedis) // pega do cache
    }

    return deputadosFederaisByEstado
  }

  async getByEstadoAndNome(
    estado: string,
    nomeDeputadoFederal: string
  ): Promise<DeputadoFederal[]> {
    const deputadosFederais = await this.getAllByEstado(estado)
    return Candidato.searchByNome(nomeDeputadoFederal, deputadosFederais)
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
        await this.deputadoFederalRepository.getFundaoByEstadoAndIdAndNumPartido(
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
