import { Router } from 'express'
import { getAllDeputadosEstaduaisByEstadoController } from '../factories/controllers/deputado-estadual-controller-factory'

export const registerDeputadoEstadualRoutes = (router: Router): void => {
  router.get(
    '/deputados-estaduais/:estado',
    getAllDeputadosEstaduaisByEstadoController()
  )
}
