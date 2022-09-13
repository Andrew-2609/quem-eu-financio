import { FundaoEleitoral } from './fundao-eleitoral'

export type CandidatoFromDivulgacand = {
  id: number
  nomeUrna: string
  nomeCompleto: string
  numero: number
}

export type CandidatosFromDivulgacand = {
  candidatos: CandidatoFromDivulgacand[]
}

export abstract class Candidato {
  id: number
  nomeUrna: string
  nomeCompleto: string
  numeroPartido: number
  fundos: FundaoEleitoral

  constructor(candidato: CandidatoFromDivulgacand) {
    this.id = candidato.id
    this.nomeUrna = candidato.nomeUrna
    this.nomeCompleto = candidato.nomeCompleto
    this.numeroPartido = candidato.numero
  }
}
