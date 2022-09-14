import { Router } from 'express'
import { getAllDeputadosEstaduaisByStateController } from '../factories/controllers/deputado-estadual-controller-factory'

export const registerDeputadoEstadualRoutes = (router: Router): void => {
  router.get(
    '/deputados-estaduais/:state',
    getAllDeputadosEstaduaisByStateController()
  )
}
