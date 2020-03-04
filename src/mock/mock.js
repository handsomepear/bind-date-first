import Mock, { Random } from 'mockjs'

Mock.setup({
  timeout: 800
})

Mock.mock('/post/list', {
  errorCode: 0,
  errorMessage: '',
  nextPageRecord: '',
  'list|1-10': [
    {
      'id|+1': 1,
      userId: Random.integer(1, 800),
      age: Random.integer(20, 40),
      publishTime: '刚刚',
      hasBuy: Random.boolean(),
      name: Random.cfirst(),
      birth: '2000',
      province: Random.province(),
      city: Random.city(),
      workProvince: Random.province(),
      workCity: Random.city(),
      occupation: Random.ctitle(5),
      educational: Random.ctitle(2),
      standard: Random.cparagraph(),
      vx: Random.word(10), //本人微信
      parentVx: Random.word(10), //家长微信
      imgs: new Array(9).fill(Random.image('110', '#4A7BF7'))
    }
  ]
})

Mock.mock('/post/detail', {
  errorCode: 0,
  errorMessage: '',
  nextPageRecord: '',
  post: {
    userId: Random.integer(1, 800),
    age: Random.integer(20, 40),
    publishTime: '刚刚',
    hasBuy: Random.boolean(),
    name: Random.cfirst(),
    birth: '2000',
    province: Random.province(),
    city: Random.city(),
    workProvince: Random.province(),
    workCity: Random.city(),
    occupation: Random.ctitle(5),
    educational: Random.ctitle(2),
    standard: Random.cparagraph(),
    vx: Random.word(10), //本人微信
    parentVx: Random.word(10), //家长微信
    imgs: new Array(9).fill(Random.image('110', '#4A7BF7'))
  }
})
