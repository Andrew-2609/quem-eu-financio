import {
  CandidatoFromDivulgacand,
  CandidatosFromDivulgacand
} from '@/modules/common/candidato'
import { FundaoEleitoralFromDivulgacand } from '@/modules/common/fundao-eleitoral'
import { PresidenteRepository } from '@/modules/presidente/repositories/data/presidente-repository'
import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}

export class PresidenteRepositoryAxios implements PresidenteRepository {
  async getAll(): Promise<CandidatosFromDivulgacand> {
    const { data } = await axios.get(
      'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2022/BR/2040602022/1/candidatos',
      config
    )

    return data
  }

  async getFundaoByIdAndNumPartido(
    id: number,
    numPartido: number
  ): Promise<FundaoEleitoralFromDivulgacand> {
    const { data } = await axios.get(
      `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2040602022/2022/BR/1/${numPartido}/${numPartido}/${id}`,
      config
    )

    return data
  }

  async getByNome(nomePresidente: string): Promise<CandidatoFromDivulgacand[]> {
    const { candidatos } = await this.getAll()
    const regex = new RegExp(nomePresidente.toLowerCase(), 'gi')

    const data = candidatos.filter((candidato) =>
      candidato.nomeCompleto.toLowerCase().match(regex)
    )

    return data
  }
}
