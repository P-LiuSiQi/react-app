/**
 * @description 请求基础路径
 */
let baseUrl = ''

/**
 * @description websocket地址
 */
let websocketUrl = ''

/**
 * @description 登录地址
 */
let loginUrl = ''

// 区分环境
let env = process.env.NODE_ENV ===
'development'
  ? 'development'
  : process.env.NODE_ENV ===
  'production'
    ? 'production'
    : 'test'

switch (env) {
  case 'development': // 本地环境
    baseUrl = '';
    websocketUrl = '';
    break;
  case 'production': // 生产环境
    baseUrl = '';
    websocketUrl = '';
    break;
  case 'test': // 测试环境
    baseUrl = '';
    websocketUrl = '';
    break;
  default:
    break;
}

export {
  baseUrl,
  websocketUrl,
  loginUrl
}
