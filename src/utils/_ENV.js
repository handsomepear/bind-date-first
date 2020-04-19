let _env = {
  baseURL: '',
  appId: ''
}
switch (process.env.NODE_ENV) {
  case 'development':
    _env.baseURL = ''
    _env.appId = 'wx22b46902345f4258'

    break
  case 'alpha': // 注意这里的名字要和步骤二中设置的环境名字对应起来
    _env.baseURL = ''
    _env.appId = 'wx22b46902345f4258'
    break
  case 'production':
    _env.baseURL = '/api_server'
    _env.appId = 'wx22b46902345f4258'
    break
}

export default _env
