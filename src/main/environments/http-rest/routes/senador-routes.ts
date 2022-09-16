import { Router } from 'express'
import {
  getAllSenadoresByEstadoController,
  getFundaoSenadorController,
  getSenadorByNomeController
} from '../factories/controllers/senador-controller-factory'

export const registerSenadorRoutes = (router: Router): void => {
  router.get('/senadores/:estado', getAllSenadoresByEstadoController())

  router.get('/senadores/:estado/fundao', getFundaoSenadorController())

  router.get('/senadores/:estado/:nomeSenador', getSenadorByNomeController())
}
