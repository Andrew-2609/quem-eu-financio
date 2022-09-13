import { CandidatosFromDivulgacand } from '@/modules/common/candidato'

export interface PresidenteRepository {
  getAll(): Promise<CandidatosFromDivulgacand>
}
