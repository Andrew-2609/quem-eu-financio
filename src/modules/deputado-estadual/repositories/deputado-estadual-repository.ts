import { CandidatosFromDivulgacand } from '@/modules/common/candidato'
import { FundaoEleitoralFromDivulgacand } from '@/modules/common/fundao-eleitoral'

export interface DeputadoEstadualRepository {
  getAllByState: (state: string) => Promise<CandidatosFromDivulgacand>

  getFundaoByStateAndIdAndNumPartido: (
    state: string,
    id: number,
    numPartido: number
  ) => Promise<FundaoEleitoralFromDivulgacand>
}