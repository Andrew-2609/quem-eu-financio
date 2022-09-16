import { PresidenteController } from '@/modules/presidente/controllers/presidente-controller'
import { PresidenteRepositoryAxios } from '@/modules/presidente/infra/axios/repositories/presidente-repository-axios'
import { Request, RequestHandler, Response } from 'express'

const makeGetAllPresidentesController = (): RequestHandler => {
  const controller = new PresidenteController(new PresidenteRepositoryAxios())
  return async (_request: Request, response: Response) => {
    const presidenciaveis = await controller.getAll()
    response.json(presidenciaveis)
  }
}

const makeGetPresidenteByNomeController = (): RequestHandler => {
  const controller = new PresidenteController(new PresidenteRepositoryAxios())
  return async (request: Request, response: Response) => {
    const presidenciavel = await controller.getByNome(
      request.params.nomePresidente
    )
    response.json(presidenciavel)
  }
}

const makeGetFundaoPresidenteController = (): RequestHandler => {
  const controller = new PresidenteController(new PresidenteRepositoryAxios())
  return async (request: Request, response: Response) => {
    const fundao = await controller.getFundaoByIdAndNumPartido(
      Number(request.query.id),
      Number(request.query.numPartido)
    )
    response.json(fundao)
  }
}

export {
  makeGetAllPresidentesController as getAllPresidentes,
  makeGetPresidenteByNomeController as getPresidenteByNome,
  makeGetFundaoPresidenteController as getFundaoPresidenteController
}
