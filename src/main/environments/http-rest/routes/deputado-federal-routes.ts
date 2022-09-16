import { Router } from 'express'
import {
  getAllDeputadosFederaisByEstadoController,
  getDeputadoFederalByNomeController,
  getFundaoDeputadoFederalController
} from '../factories/controllers'

export const registerDeputadoFederalRoutes = (router: Router): void => {
  router.get(
    '/deputados-federais/:estado',
    getAllDeputadosFederaisByEstadoController()
  )

  router.get(
    '/deputados-federais/:estado/fundao',
    getFundaoDeputadoFederalController()
  )

  router.get(
    '/deputados-federais/:estado/:nomeDeputadoFederal',
    getDeputadoFederalByNomeController()
  )
}
