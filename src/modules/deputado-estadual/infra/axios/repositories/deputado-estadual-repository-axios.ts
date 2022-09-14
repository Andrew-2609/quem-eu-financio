import { CandidatosFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoralFromDivulgacand } from '@/modules/common/fundao-eleitoral'
import { DeputadoEstadualRepository } from '@/modules/deputado-estadual/repositories/deputado-estadual-repository'
import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}

export class DeputadoEstadualRepositoryAxios
  implements DeputadoEstadualRepository
{
  async getAllByState(state: string): Promise<CandidatosFromDivulgacand> {
    const { data } = await axios.get(
      `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2022/${state}/2040602022/7/candidatos`,
      config
    )

    return data
  }

  async getFundaoByStateAndIdAndNumPartido(
    state: string,
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoralFromDivulgacand> {
    // for state deputies, the party number is the original 2 digits plus other digits of their choice
    const numPartidoOriginal = Number(String(numPartido).slice(0, 2))

    const { data } = await axios.get(
      `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2040602022/2022/${state}/7/${numPartidoOriginal}/${numPartido}/${id}`,
      config
    )

    return data
  }
}
