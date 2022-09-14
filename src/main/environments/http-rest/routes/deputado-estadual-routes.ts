import { Router } from 'express'
import {
  getAllDeputadosEstaduaisByEstadoController,
  getDeputadoEstadualByNomeController
} from '../factories/controllers/deputado-estadual-controller-factory'

export const registerDeputadoEstadualRoutes = (router: Router): void => {
  router.get(
    '/deputados-estaduais/:estado',
    getAllDeputadosEstaduaisByEstadoController()
  )

  router.get(
    '/deputados-estaduais/:estado/:nomeDeputadoEstadual',
    getDeputadoEstadualByNomeController()
  )
}
