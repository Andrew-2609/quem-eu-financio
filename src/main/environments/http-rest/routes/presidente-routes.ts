import { Router } from 'express'
import { getAllPresidentes, getPresidenteByNome } from '../factories/controllers/presidente-controller-factory'

export const registerPresidenteRoutes = (router: Router): void => {
  router.get('/presidentes', getAllPresidentes())
  router.get('/presidentes/:nomePresidente', getPresidenteByNome())
}
