import { DeputadoFederalController } from '@/modules/deputado-federal/controllers/deputado-federal-controller'
import { DeputadoFederalRepositoryAxios } from '@/modules/deputado-federal/infra/axios/repositories/deputado-federal-repository-axios'
import { Request, RequestHandler, Response } from 'express'

const makeGetAllDeputadosFederaisByEstadoController = (): RequestHandler => {
  const controller = new DeputadoFederalController(
    new DeputadoFederalRepositoryAxios()
  )

  return async (request: Request, response: Response) => {
    const deputadosFederais = await controller.getAllByEstado(
      request.params.estado.toUpperCase()
    )
    response.json(deputadosFederais)
  }
}

const makeGetDeputadoFederalByNomeController = (): RequestHandler => {
  const controller = new DeputadoFederalController(
    new DeputadoFederalRepositoryAxios()
  )
  return async (request: Request, response: Response) => {
    const deputadoFederal = await controller.getByEstadoAndNome(
      request.params.estado,
      request.params.nomeDeputadoFederal
    )
    response.json(deputadoFederal)
  }
}

const makeGetFundaoDeputadoFederalController = (): RequestHandler => {
  const controller = new DeputadoFederalController(
    new DeputadoFederalRepositoryAxios()
  )
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
  makeGetAllDeputadosFederaisByEstadoController as getAllDeputadosFederaisByEstadoController,
  makeGetDeputadoFederalByNomeController as getDeputadoFederalByNomeController,
  makeGetFundaoDeputadoFederalController as getFundaoDeputadoFederalController
}
