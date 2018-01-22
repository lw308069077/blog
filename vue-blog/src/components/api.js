/**
 * Created by liwen on 2018/01/05.
 */
import axios from 'axios'

export default {
  methods: {
    /* 注册 */
    async register(param) {
      try {
        let res = await this.$http.post(`/restful/api/user/register`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 登录 */
    async login(param) {
      try {
        let res = await this.$http.post(`/restful/api/user/login`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 退出 */
    async logOut() {
      try {
        let res = await this.$http.get(`/restful/api/logout`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 校验登录状态 */
    async checkLogin() {
      try {
        let res = await this.$http.get(`/restful/api/checkLogin`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 获取用户列表 */
    async getUsers() {
      try {
        let res = await this.$http.get(`/restful/api/user`)
        console.log(res.data.result)
        return res.data.result
      } catch (res) {
        console.log(res)
      }
    }
  }
}
