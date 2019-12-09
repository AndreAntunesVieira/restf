import { Request, Response } from 'express'

interface ControllerOptions {
  status?: number
}

export default class RestfController {
  req: Request | any
  res: Response | any
  sent?: boolean
  permit?: Array<string>

  constructor(req: Request | any, res: Response | any) {
    this.req = req
    this.res = res
  }

  status(code: number) {
    this.res.status(code)
    return this
  }

  respondWith(data: any, options: ControllerOptions = {}) {
    if (this.sent) return null
    if (options.status) this.res.status(options.status)
    if (options.status || data) return this.sendWithMiddlewares(data)

    this.sent = true
    this.res.status(204)
    return this.res.send()
  }

  private sendWithMiddlewares(data, i = 0) {
    if (this.req.afterMiddlewares && i < this.req.afterMiddlewares.length) {
      return this.req.afterMiddlewares[i](this, data, newData => this.sendWithMiddlewares(newData, i + 1))
    }
    if (this.sent) return null
    this.sent = true
    if (typeof data === 'string') return this.res.send(data)
    return this.res.json(data)
  }

  params(...permit: Array<string>) {
    const controllerPermit = this.permit
    if (controllerPermit) permit = [...controllerPermit, ...permit]
    if (permit.length === 0) return this.req.body
    return objectFilter(this.req.body, permit)
  }
}

function objectFilter(obj: any, fields: Array<string>) {
  return fields.reduce((result: any, field: string) => {
    if (obj[field]) result[field] = obj[field]
    return result
  }, {})
}
