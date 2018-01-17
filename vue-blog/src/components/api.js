/**
 * Created by liwen on 2018/01/05.
 */

export default {
    methods: {
      /* 提交表单 */
      async sub(param) {
          console.log('11111111111')
        try {
          let res = await this.$http.post(`/restful/api/user/register`,param)
          console.log(res.data)
          return res.data
        } catch (res) {
          console.log(res)
        }
      }
    }
  }
  