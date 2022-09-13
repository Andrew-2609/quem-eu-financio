export type FundaoEleitoralFromDivulgacand = {
  dadosConsolidados: {
    graphVrReceitaFin: number
    graphVrReceitaFinFundo: number
    graphVrReceitaFinOutros: number
    graphVrReceitaFinFefc: number
  }
}

const realBrasileiro: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'BRL'
}

export class FundaoEleitoral {
  totalLiquido: string
  fundoPartidario: string
  outrosRecursos: string
  fundoEspecial: string

  constructor({ dadosConsolidados }: FundaoEleitoralFromDivulgacand) {
    this.totalLiquido = this.real(dadosConsolidados?.graphVrReceitaFin)
    this.fundoPartidario = this.real(dadosConsolidados?.graphVrReceitaFinFundo)
    this.outrosRecursos = this.real(dadosConsolidados?.graphVrReceitaFinOutros)
    this.fundoEspecial = this.real(dadosConsolidados?.graphVrReceitaFinFefc)
    Object.freeze(this)
  }

  private real(receita: number) {
    return receita?.toLocaleString('pt-BR', realBrasileiro)
  }
}
