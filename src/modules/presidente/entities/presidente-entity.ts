import { Candidato, CandidatoFromDivulgacand } from '@/modules/common/candidato'

export class Presidente extends Candidato {
  constructor(candidato: CandidatoFromDivulgacand) {
    super('BR', candidato)
  }
}
