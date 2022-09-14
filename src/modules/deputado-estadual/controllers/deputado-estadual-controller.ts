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

  async getAllByEstado(estado: string): Promise<DeputadoEstadual[]> {
    let deputadosEstaduaisByEstado: DeputadoEstadual[] = []
    const deputadosEstaduaisByEstadoRedis = await getRedis(
      `deputados-estaduais-${estado}`
    )

    if (!deputadosEstaduaisByEstadoRedis) {
      const { candidatos } =
        await this.deputadoEstadualRepository.getAllByEstado(estado)

      deputadosEstaduaisByEstado = await this.adicionarFundosDosCandidatos(
        estado,
        candidatos
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

  private async getFundaoByIdAndNumPartido(
    estado: string,
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoral> {
    const fundaoFromDivulgaCand =
      await this.deputadoEstadualRepository.getFundaoByEstadoAndIdAndNumPartido(
        estado,
        id,
        numPartido
      )
    return new FundaoEleitoral(fundaoFromDivulgaCand)
  }

  private async adicionarFundosDosCandidatos(
    estado: string,
    candidatosFromDivulgacand: CandidatoFromDivulgacand[]
  ): Promise<DeputadoEstadual[]> {
    return await Promise.all(
      candidatosFromDivulgacand.map(
        async (candidato): Promise<DeputadoEstadual> => {
          const deputadoEstadual = new DeputadoEstadual(estado, candidato)

          // get the data from getFundaoByIdAndNumPartido and set to deputadoEstadual.fundos
          deputadoEstadual.fundos = await this.getFundaoByIdAndNumPartido(
            estado,
            deputadoEstadual.id,
            deputadoEstadual.numero
          )

          return deputadoEstadual
        }
      )
    )
  }
}
