export type FundaoEleitoralFromDivulgacand = {
  dadosConsolidados: {
    graphVrReceitaFin: number
    graphVrReceitaFinFundo: number
    graphVrReceitaFinOutros: number
    graphVrReceitaFinFefc: number
  }
}

export class FundaoEleitoral {
  totalLiquido: number
  fundoPartidario: number
  outrosRecursos: number
  fundoEspecial: number

  constructor({ dadosConsolidados }: FundaoEleitoralFromDivulgacand) {
    this.totalLiquido = dadosConsolidados?.graphVrReceitaFin
    this.fundoPartidario = dadosConsolidados?.graphVrReceitaFinFundo
    this.outrosRecursos = dadosConsolidados?.graphVrReceitaFinOutros
    this.fundoEspecial = dadosConsolidados?.graphVrReceitaFinFefc
    Object.freeze(this)
  }
}
