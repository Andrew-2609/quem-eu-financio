import compression from 'compression'
import express, { Router } from 'express'
import { endpointNotFound } from './factories/middlewares/endpoint-not-found'
import cors from 'cors'
import {
  registerDeputadoEstadualRoutes,
  registerDeputadoFederalRoutes,
  registerGovernadorRoutes,
  registerPresidenteRoutes,
  registerSenadorRoutes
} from './routes'

export class HttpRestEnvironment {
  constructor(
    private readonly port: number,
    private readonly version: string
  ) {}

  handler = express()

  start(): void {
    this.handler.use(express.json())
    this.handler.use(compression())
    this.handler.use(cors({
      origin: 'http://quem-eu-financio.s3-website-sa-east-1.amazonaws.com'
    }))
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
    registerGovernadorRoutes(router)
    registerSenadorRoutes(router)
    registerDeputadoEstadualRoutes(router)
    registerDeputadoFederalRoutes(router)
    return router
  }
}
