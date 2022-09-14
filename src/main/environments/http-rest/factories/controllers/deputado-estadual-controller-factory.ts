import { DeputadoEstadualController } from '@/modules/deputado-estadual/controllers/deputado-estadual-controller'
import { DeputadoEstadualRepositoryAxios } from '@/modules/deputado-estadual/infra/axios/repositories/deputado-estadual-repository-axios'
import { Request, RequestHandler, Response } from 'express'

const makeGetAllDeputadosEstaduaisByEstadoController = (): RequestHandler => {
  const controller = new DeputadoEstadualController(
    new DeputadoEstadualRepositoryAxios()
  )

  return async (request: Request, response: Response) => {
    const deputadosEstaduais = await controller.getAllByEstado(
      request.params.estado.toUpperCase()
    )
    response.json(deputadosEstaduais)
  }
}

const makeGetDeputadoEstadualByNomeController = (): RequestHandler => {
  const controller = new DeputadoEstadualController(
    new DeputadoEstadualRepositoryAxios()
  )
  return async (request: Request, response: Response) => {
    const deputadoEstadual = await controller.getByEstadoAndNome(
      request.params.estado,
      request.params.nomeDeputadoEstadual
    )
    response.json(deputadoEstadual)
  }
}

export {
  makeGetAllDeputadosEstaduaisByEstadoController as getAllDeputadosEstaduaisByEstadoController,
  makeGetDeputadoEstadualByNomeController as getDeputadoEstadualByNomeController
}
