import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface ControllerOptions {
  status?: number
}

export default class RestfController {
  req: Request | any
  res: Response | any
  sent?: boolean
  permit?: Array<string>
  currentMethod?: string = 'undefined'

  protected static serialize = undefined

  constructor(req: Request | any, res: Response | any) {
    this.req = req
    this.res = res
  }

  public run(method: string, ...args) {
    this.currentMethod = method
    return this[method](...args)
  }

  protected status(code: number) {
    this.res.status(code)
    return this
  }

  protected respondWith(data: any, options: ControllerOptions = {}) {
    if (this.sent) return null
    if (options.status) this.res.status(options.status)
    if (options.status || data) return this.sendWithMiddlewares(data)

    this.sent = true
    this.res.status(204)
    return this.res.send()
  }

  protected get currentUser() {
    if (this.req.credentials) return this.req.credentials
    const authorization = this.req.cookies.token || this.req.headers.authorization
    if (!authorization) return null
    const token = authorization.replace(/bearer( +)?/i, '')
    if (!token) return null
    this.req.credentials = this.tokenToCredentials(token)
    Object.defineProperty(this.req.credentials, 'iat', { enumerable: false })
    Object.defineProperty(this.req.credentials, 'exp', { enumerable: false })
    return this.req.credentials
  }

  protected tokenToCredentials(token: string){
    return jwt.verify(token, process.env.JWT_SECRET || '')
  }

  protected serialize(...a: any[]) {
    const constructor: any = this.constructor
    const Serializer: any = constructor.serializer
    if (!Serializer) return null
    const currentMethod = this.currentMethod
    return new Serializer(this)[currentMethod](...a)
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
