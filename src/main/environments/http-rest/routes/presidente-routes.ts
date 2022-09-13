import { Router } from 'express'
import { getAllPresidentes } from '../factories/controllers/presidente-controller-factory'

export const registerPresidenteRoutes = (router: Router): void => {
  router.get('/presidentes', getAllPresidentes())
}
