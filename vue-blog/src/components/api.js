/**
 * Created by liwen on 2018/01/05.
 */

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
        return res.data
      } catch (res) {
        console.log(res)
      }
    }
  }
}
