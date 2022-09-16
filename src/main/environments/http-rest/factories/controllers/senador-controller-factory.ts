import { SenadorController } from '@/modules/senador/controllers/senador-controller'
import { SenadorRepositoryAxios } from '@/modules/senador/infra/axios/repositories/senador-repository-axios'
import { Request, RequestHandler, Response } from 'express'

const makeGetAllSenadoresByEstadoController = (): RequestHandler => {
  const controller = new SenadorController(new SenadorRepositoryAxios())

  return async (request: Request, response: Response) => {
    const senadores = await controller.getAllByEstado(
      request.params.estado.toUpperCase()
    )
    response.json(senadores)
  }
}

const makeGetSenadorByNomeController = (): RequestHandler => {
  const controller = new SenadorController(new SenadorRepositoryAxios())
  return async (request: Request, response: Response) => {
    const senador = await controller.getByEstadoAndNome(
      request.params.estado,
      request.params.nomeSenador
    )
    response.json(senador)
  }
}

const makeGetFundaoSenadorController = (): RequestHandler => {
  const controller = new SenadorController(new SenadorRepositoryAxios())
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
  makeGetAllSenadoresByEstadoController as getAllSenadoresByEstadoController,
  makeGetSenadorByNomeController as getSenadorByNomeController,
  makeGetFundaoSenadorController as getFundaoSenadorController
}
