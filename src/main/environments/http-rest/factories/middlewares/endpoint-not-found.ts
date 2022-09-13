import { NextFunction, Request, RequestHandler, Response } from 'express'

export const endpointNotFound = (): RequestHandler => {
  return async (request: Request, response: Response, _next: NextFunction) => {
    response.status(404)

    if (request.accepts('json')) {
      response.json({
        statusCode: 404,
        error: 'Not Found',
        url: request.baseUrl
      })
      return
    }

    response.type('txt').send('404 - Not Found')
  }
}
