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
    }
  }
}
