import { Router } from 'express'
import {
  getAllPresidentes,
  getFundaoPresidenteController,
  getPresidenteByNome
} from '../factories/controllers'

export const registerPresidenteRoutes = (router: Router): void => {
  router.get('/presidentes', getAllPresidentes())
  router.get('/presidentes/fundao', getFundaoPresidenteController())
  router.get('/presidentes/:nomePresidente', getPresidenteByNome())
}
