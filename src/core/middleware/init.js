import { Controller, Model } from '../class'
import { getConfig } from '../utils'


export const init = app => {
  app.use(async (ctx, next) => {
    // 初始化Controller
    Controller.prototype.app = app
    Controller.prototype.ctx = ctx
    Controller.prototype.next = next
    Controller.prototype.config = getConfig()
    // 初始化模型
    Model.prototype.config = getConfig()
    await next()
  })
}
