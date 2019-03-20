/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 21:24
 */
import {Token} from "../token/Token"
import {r} from "../../utils/utils"

export const validate = ({name, scene}) => {
  // name首字母设置为大写
  name = name.substr(0, 1).toUpperCase() + name.substr(1, name.length-1)

  const Validate = require(r(`./validate/${name}Validate`))[`${name}Validate`]
  return addMiddleware(async (ctx, next) => {
    await new Validate().check(ctx, scene)
    await next()
  })
}

export const auth = (type) => {
  let scope
  if (type === 'user' || !type) {
    scope = $config.SCOPE.USER
  } else if (type === 'super') {
    scope = $config.SCOPE.SUPER
  }
  return addMiddleware(async (ctx, next) => {
    Token.checkScope(ctx, scope)
    await next()
  })
}

export const addMiddleware = (middleware) => {
  return (target, key) => {
    if (!Array.isArray(target[key])){
      target[key] = [target[key]]
    }
    target[key].unshift(middleware)
  }
}
