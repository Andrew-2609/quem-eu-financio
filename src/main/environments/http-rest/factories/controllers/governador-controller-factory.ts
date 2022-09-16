import { GovernadorController } from '@/modules/governador/controllers/governador-controller'
import { GovernadorRepositoryAxios } from '@/modules/governador/infra/axios/repositories/governador-repository-axios'
import { Request, RequestHandler, Response } from 'express'

const makeGetAllGovernadoresByEstadoController = (): RequestHandler => {
  const controller = new GovernadorController(new GovernadorRepositoryAxios())

  return async (request: Request, response: Response) => {
    const governadores = await controller.getAllByEstado(
      request.params.estado.toUpperCase()
    )
    response.json(governadores)
  }
}

const makeGetGovernadorByNomeController = (): RequestHandler => {
  const controller = new GovernadorController(new GovernadorRepositoryAxios())
  return async (request: Request, response: Response) => {
    const governador = await controller.getByEstadoAndNome(
      request.params.estado,
      request.params.nomeGovernador
    )
    response.json(governador)
  }
}

const makeGetFundaoGovernadorController = (): RequestHandler => {
  const controller = new GovernadorController(new GovernadorRepositoryAxios())
  return async (request: Request, response: Response) => {
    const fundao = await controller.getFundaoByEstadoAndIdAndNumPartido(
      request.params.estado,
      Number(request.query.id),
      Number(request.query.numero)
    )
    response.json(fundao)
  }
}

export {
  makeGetAllGovernadoresByEstadoController as getAllGovernadoresByEstadoController,
  makeGetGovernadorByNomeController as getGovernadorByNomeController,
  makeGetFundaoGovernadorController as getFundaoGovernadorController
}
