import Mock, { Random } from 'mockjs'

Mock.setup({
  timeout: 800
})

Mock.mock('/post/list', {
  errCode: 0,
  errMessage: '',
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
  errCode: 0,
  errMessage: '',
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

Mock.mock('/homepage', {
  errCode: 0, //0:正常 其他：异常
  errMessage: '', //errCode不为0时,说明失败原因
  info: {
    id: 1,
    nickName: Random.cfirst(),
    headUrl: Random.image('110', '#4A7BF7')
  },
  mineList: [
    {
      id: Random.integer(1, 800),
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
  ],
  buyList: [
    {
      id: Random.integer(1, 800),
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
