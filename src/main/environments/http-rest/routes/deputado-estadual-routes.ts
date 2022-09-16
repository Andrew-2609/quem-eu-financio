import { Router } from 'express'
import {
  getAllDeputadosEstaduaisByEstadoController,
  getDeputadoEstadualByNomeController,
  getFundaoDeputadoEstadualController
} from '../factories/controllers'

export const registerDeputadoEstadualRoutes = (router: Router): void => {
  router.get(
    '/deputados-estaduais/:estado',
    getAllDeputadosEstaduaisByEstadoController()
  )

  router.get(
    '/deputados-estaduais/:estado/fundao',
    getFundaoDeputadoEstadualController()
  )

  router.get(
    '/deputados-estaduais/:estado/:nomeDeputadoEstadual',
    getDeputadoEstadualByNomeController()
  )
}
