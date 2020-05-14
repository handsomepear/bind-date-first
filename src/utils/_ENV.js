let _env = {
  baseURL: '',
  appId: ''
}
switch (process.env.NODE_ENV) {
  case 'development':
    _env.baseURL = ''
    _env.appId = 'wxdbab60fecfbc0e81'

    break
  case 'alpha': // 注意这里的名字要和步骤二中设置的环境名字对应起来
    _env.baseURL = ''
    _env.appId = 'wxdbab60fecfbc0e81'
    break
  case 'production':
    _env.baseURL = '/api'
    _env.appId = 'wxdbab60fecfbc0e81'
    break
}

export default _env
