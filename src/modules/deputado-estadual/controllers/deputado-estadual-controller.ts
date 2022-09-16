import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { Candidato } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { DeputadoEstadual } from '../entities/deputado-estadual-entity'
import { DeputadoEstadualRepository } from '../repositories/deputado-estadual-repository'

export class DeputadoEstadualController {
  constructor(
    private readonly deputadoEstadualRepository: DeputadoEstadualRepository
  ) {}

  async getAllByEstado(estado: string): Promise<DeputadoEstadual[]> {
    let deputadosEstaduaisByEstado: DeputadoEstadual[] = []
    const deputadosEstaduaisByEstadoRedis = await getRedis(
      `deputados-estaduais-${estado}`
    )

    if (!deputadosEstaduaisByEstadoRedis) {
      const { candidatos } =
        await this.deputadoEstadualRepository.getAllByEstado(estado)

      deputadosEstaduaisByEstado = candidatos.map(
        (candidato) => new DeputadoEstadual(estado, candidato)
      )

      setRedis(
        `deputados-estaduais-${estado}`,
        JSON.stringify(deputadosEstaduaisByEstado) // set cache if not setted
      )
    } else {
      deputadosEstaduaisByEstado = JSON.parse(deputadosEstaduaisByEstadoRedis) // get from cache
    }

    return deputadosEstaduaisByEstado
  }

  async getByEstadoAndNome(
    estado: string,
    nomeDeputadoEstadual: string
  ): Promise<DeputadoEstadual[]> {
    const deputadosEstaduais = await this.getAllByEstado(estado)
    return Candidato.searchByNome(nomeDeputadoEstadual, deputadosEstaduais)
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
        await this.deputadoEstadualRepository.getFundaoByEstadoAndIdAndNumPartido(
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
