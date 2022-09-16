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
  numero: number
  confiraEm: string

  constructor(areaAtuacao: string, candidato: CandidatoFromDivulgacand) {
    this.id = candidato.id
    this.nomeUrna = candidato.nomeUrna
    this.nomeCompleto = candidato.nomeCompleto
    this.numero = candidato.numero
    this.confiraEm = `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/2022/2040602022/${areaAtuacao}/${this.id}`
  }

  static searchByNome(nome: string, candidatos: Candidato[]): Candidato[] {
    const regex = new RegExp(nome.toLowerCase(), 'gi')

    const candidatosProcurados = candidatos.filter(
      (candidato) =>
        candidato.nomeCompleto.toLowerCase().match(regex) ||
        candidato.nomeUrna.toLowerCase().match(regex)
    )

    return candidatosProcurados
  }
}
