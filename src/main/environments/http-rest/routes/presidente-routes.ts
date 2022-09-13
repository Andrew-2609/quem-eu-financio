import { Router } from 'express'

export const registerPresidenteRoutes = (router: Router): void => {
  router.get('/presidentes', (_req, res) => {
    res.json({ message: 'ok' })
  })
}
