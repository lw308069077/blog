/**
 * Created by liwen on 2018/01/05.
 */

export default {
    methods: {
      /* 提交表单 */
      async sub(params) {
          console.log('11111111111')
        try {
          let res = await this.$http.post(`/cmp/v1/api/user/register`, params)
          console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      }
    }
  }
  