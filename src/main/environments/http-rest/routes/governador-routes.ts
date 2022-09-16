import { Router } from 'express'
import {
  getAllGovernadoresByEstadoController,
  getFundaoGovernadorController,
  getGovernadorByNomeController
} from '../factories/controllers/governador-controller-factory'

export const registerGovernadorRoutes = (router: Router): void => {
  router.get('/governadores/:estado', getAllGovernadoresByEstadoController())

  router.get('/governadores/:estado/fundao', getFundaoGovernadorController())

  router.get(
    '/governadores/:estado/:nomeGovernador',
    getGovernadorByNomeController()
  )
}
