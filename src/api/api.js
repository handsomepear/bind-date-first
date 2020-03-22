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

export const updatePostApi = data => {
  return fetch({
    url: '/post/update',
    data
  })
}

export const deleteApi = data => {
  return fetch({
    url: '/post/delete',
    data
  })
}

export const buyApi = data => {
  return fetch({
    url: '/post/buy',
    data
  })
}

export const accuseApi = data => {
  return fetch({
    url: '/post/accuse',
    data
  })
}

export const getPostDetailApi = data => {
  return fetch({
    url: '/post/detail',
    data
  })
}

export const getHomepageInfoApi = () => {
  return fetch({
    url: '/homepage'
  })
}
