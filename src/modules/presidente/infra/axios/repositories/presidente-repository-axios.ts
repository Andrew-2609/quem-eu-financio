import { PresidenteRepository } from '@/modules/presidente/repositories/data/presidente-repository'
import axios from 'axios'

export class PresidenteRepositoryAxios implements PresidenteRepository {
  async getAll(): Promise<any> {
    const data = await axios.get(
      'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2022/BR/2040602022/1/candidatos',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    )

    return data
  }
}
