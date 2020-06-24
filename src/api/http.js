import axios from 'axios';
// import router from '../router'
import QS from 'qs';          // 引入qs模块，用来序列化post类型的数据
import { baseUrl } from '../config/deployUrl';

// 设置基础URL
axios.defaults.baseURL = baseUrl;

// 设置请求超时时间
// axios.defaults.timeout = 1000;

// 让ajax携带cookie
axios.defaults.withCredentials = false

/**
 * @param obj
 * @description 判断元素类型
 */
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

/**
 * @param obj
 * @description 参数过滤函数
 */
function filterNull(obj) {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === '') {
      Reflect.deleteProperty(obj, key)
    }
    if (toType(obj[key]) === 'string') {
      obj[key] = obj[key].trim()
    } else if (toType(obj[key]) === 'object') {
      obj[key] = filterNull(obj[key])
    } else if (toType(obj[key]) === 'array') {
      obj[key] = filterNull(obj[key])
    }
  }
  return obj
}

// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.common['authorization'] = token === null ? '' : token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // let status = response.data.status
  // let code = response.data.code
  // let msg = response.data.message
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则抛出错误
  // if (status === 'success') {
  // } else {
  //   switch (code) {
  //     // 401: 未登录
  //     // 未登录则跳转登录页面，并携带当前页面的路径
  //     case 401:
  //       router.replace({
  //         path: '/login',
  //         query: {
  //           redirect: router.currentRoute.fullPath
  //         }
  //       });
  //       break;
  //     // 403 token过期
  //     // 登录过期对用户进行提示
  //     // 清除本地token和清空vuex中token对象
  //     // 跳转登录页面
  //     case 403:
  //       Notification.warning({
  //         title: '登录过期',
  //         message: '登录过期，请重新登录',
  //         duration: 3000
  //       });
  //       // 清除token
  //       localStorage.removeItem('token');
  //       // 跳转登录页，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
  //       setTimeout(() => {
  //         router.replace({
  //           path: '/login',
  //           query: {
  //             redirect: router.currentRoute.fullPath
  //           }
  //         });
  //       }, 1000);
  //       break;
  //     case 404:
  //       Notification.warning({
  //         title: '404 NOT FOUND',
  //         message: '页面丢失~',
  //         duration: 3000
  //       });
  //       break;
  //     // 其他错误，直接抛出错误提示
  //     default:
  //       Notification.warning({
  //         title: '请求错误',
  //         message: msg,
  //         duration: 3000
  //       });
  //       break;
  //   }
  // }
  return response
}, function (error) {
  // let errmsg = '网络异常'
  // Notification.error({
  //   title: errmsg,
  //   message: error.message,
  //   duration: 3000
  // });
  return Promise.reject(error)
})

export const request = {
  get: function (url, data, contentType = 'form') {
    const contType = contentType === 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8'
    if (data) {
      data = filterNull(data)
    }
    let config = {
      method: 'get',
      url: url,
      headers: { 'Content-Type': contType },
      params: data || {}
    }
    return axios(config)
  },
  post: function (url, data, responseType, contentType = 'form') {
    const contType = contentType === 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded'
    if (data) {
      data = filterNull(data)
    }
    let config = {
      method: 'post',
      url: url,
      headers: { 'Content-Type': contType },
      responseType: responseType,
      data: QS.stringify(data) || {}
    };
    return axios(config)
  },
  multipleRequest: function (requests) {
    let reqArray = []
    if (requests.length > 0) {
      for (let req of requests) {
        if (req.method === 'GET') {
          reqArray.push(axios.get(req.url, { params: req.data }))
        } else if (req.method === 'POST') {
          reqArray.push(axios.post(req.url, req.data))
        }
      }
      return axios.all(reqArray)
    }
  }
}
