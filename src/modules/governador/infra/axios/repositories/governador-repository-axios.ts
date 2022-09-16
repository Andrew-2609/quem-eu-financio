import { CandidatosFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoralFromDivulgacand } from '@/modules/common/fundao-eleitoral'
import { GovernadorRepository } from '@/modules/governador/repositories/governador-repository'
import axios, { AxiosRequestConfig } from 'axios'
import https from 'https'

const config: AxiosRequestConfig = {
  headers: { 'User-Agent': 'Mozilla/5.0' },
  timeout: 600000,
  httpsAgent: new https.Agent({ keepAlive: true })
}

export class GovernadorRepositoryAxios implements GovernadorRepository {
  async getAllByEstado(estado: string): Promise<CandidatosFromDivulgacand> {
    const { data } = await axios.get(
      `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2022/${estado}/2040602022/3/candidatos`,
      config
    )

    return data
  }

  async getFundaoByEstadoAndIdAndNumPartido(
    estado: string,
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoralFromDivulgacand> {
    // for governors, the party number is the original 2 digits plus other digits of their choice
    const numPartidoOriginal = Number(String(numPartido).slice(0, 2))

    const { data } = await axios.get(
      `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2040602022/2022/${estado}/3/${numPartidoOriginal}/${numPartido}/${id}`,
      config
    )

    return data
  }
}
