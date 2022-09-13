import { PresidenteController } from '@/modules/presidente/controllers/presidente-controller'
import { PresidenteRepositoryAxios } from '@/modules/presidente/infra/axios/repositories/presidente-repository-axios'
import { Request, RequestHandler, Response } from 'express'

const makeGetAllPresidentesController = (): RequestHandler => {
  const contoller = new PresidenteController(new PresidenteRepositoryAxios())
  return async (_request: Request, response: Response) => {
    const presidenciaveis = await contoller.getAll()
    response.json(presidenciaveis)
  }
}

export { makeGetAllPresidentesController as getAllPresidentes }
