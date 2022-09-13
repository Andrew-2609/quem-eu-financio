import { CandidatosFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoralFromDivulgacand } from '@/modules/common/fundao-eleitoral'

export interface PresidenteRepository {
  getAll: () => Promise<CandidatosFromDivulgacand>

  getFundaoByIdAndNumPartido: (
    id: number,
    numPartido: number
  ) => Promise<FundaoEleitoralFromDivulgacand>
}
