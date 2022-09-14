import {
  getRedis,
  setRedis
} from '@/main/environments/common/infra/redis/redisConfig'
import { CandidatoFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoral } from '@/modules/common/fundao-eleitoral'
import { DeputadoEstadual } from '../entities/deputado-estadual-entity'
import { DeputadoEstadualRepository } from '../repositories/deputado-estadual-repository'

export class DeputadoEstadualController {
  constructor(
    private readonly deputadoEstadualRepository: DeputadoEstadualRepository
  ) {}

  async getAllByState(state: string): Promise<DeputadoEstadual[]> {
    let deputadosEstaduaisByEstado: DeputadoEstadual[] = []
    const deputadosEstaduaisByEstadoRedis = await getRedis(
      `deputados-estaduais-${state}`
    )

    if (!deputadosEstaduaisByEstadoRedis) {
      const { candidatos } =
        await this.deputadoEstadualRepository.getAllByState(state)

      deputadosEstaduaisByEstado = await this.adicionarFundosDosCandidatos(
        state,
        candidatos
      )

      setRedis(
        `deputados-estaduais-${state}`,
        JSON.stringify(deputadosEstaduaisByEstado) // set cache if not setted
      )
    } else {
      deputadosEstaduaisByEstado = JSON.parse(deputadosEstaduaisByEstadoRedis) // get from cache
    }

    return deputadosEstaduaisByEstado
  }

  private async getFundaoByIdAndNumPartido(
    state: string,
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoral> {
    const fundaoFromDivulgaCand =
      await this.deputadoEstadualRepository.getFundaoByStateAndIdAndNumPartido(
        state,
        id,
        numPartido
      )
    return new FundaoEleitoral(fundaoFromDivulgaCand)
  }

  private async adicionarFundosDosCandidatos(
    state: string,
    candidatosFromDivulgacand: CandidatoFromDivulgacand[]
  ): Promise<DeputadoEstadual[]> {
    return await Promise.all(
      candidatosFromDivulgacand.map(
        async (candidato): Promise<DeputadoEstadual> => {
          const deputadoEstadual = new DeputadoEstadual(state, candidato)

          // get the data from getFundaoByIdAndNumPartido and set to deputadoEstadual.fundos
          deputadoEstadual.fundos = await this.getFundaoByIdAndNumPartido(
            state,
            deputadoEstadual.id,
            deputadoEstadual.numeroPartido
          )

          return deputadoEstadual
        }
      )
    )
  }
}
