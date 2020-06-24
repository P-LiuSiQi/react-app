import Mock from 'mockjs'

const domain = '/api/'

// 模拟getData接口
Mock.mock(domain + 'getData', function () {
  let result = {
    code: 200,
    message: 'Ok',
    data: 'test'
  }
  return result
})