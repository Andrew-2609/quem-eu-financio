import { CandidatosFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoralFromDivulgacand } from '@/modules/common/fundao-eleitoral'

export interface GovernadorRepository {
  getAllByEstado: (estado: string) => Promise<CandidatosFromDivulgacand>

  getFundaoByEstadoAndIdAndNumPartido: (
    estado: string,
    id: number,
    numPartido: number
  ) => Promise<FundaoEleitoralFromDivulgacand>
}
