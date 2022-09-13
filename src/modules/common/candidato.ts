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
  confiraEm: string

  constructor(range: string, candidato: CandidatoFromDivulgacand) {
    this.id = candidato.id
    this.nomeUrna = candidato.nomeUrna
    this.nomeCompleto = candidato.nomeCompleto
    this.numeroPartido = candidato.numero
    this.confiraEm = `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/2022/2040602022/${range}/${this.id}`
  }
}
