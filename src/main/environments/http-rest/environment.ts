import compression from 'compression'
import express, { Router } from 'express'
import { endpointNotFound } from './factories/middlewares/endpoint-not-found'
import { registerPresidenteRoutes } from './routes/presidente-routes'

export class HttpRestEnvironment {
  constructor(
    private readonly port: number,
    private readonly version: string
  ) {}

  handler = express()

  start(): void {
    this.handler.use(express.json())
    this.handler.use(compression())
    this.handler.disable('x-powered-by')
    const URL = `/quem-eu-financio/${this.version}`
    this.handler.use(URL, this.getRouter())
    this.handler.use('*', endpointNotFound())
    this.handler.listen(this.port, () => {
      console.log(`\n\n\n Listening at ${this.port} \n\n\n`)
    })
  }

  private getRouter(): Router {
    const router = Router()
    router.get('/health', (_req, res) => res.send('ok'))
    registerPresidenteRoutes(router)
    return router
  }
}
