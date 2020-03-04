import fetch from '../utils/_request'

// 获取首页帖子列表
export const getPostListApi = data => {
  return fetch({
    url: '/post/list',
    data
  })
}

export const loginApi = data => {
  return fetch({
    url: '/login',
    data
  })
}

export const cretePostApi = data => {
  return fetch({
    url: '/post/add',
    data
  })
}

export const getPostDetailApi = data => {
  return fetch({
    url: '/post/detail',
    data
  })
}

export const getMyPostListApi = () => {
  return fetch({
    url: '/post/homepage'
  })
}
