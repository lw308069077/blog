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
    async getUsers(param) {
      try {
        let res = await this.$http.get(`/restful/api/user`,{params: param})
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 添加分类 */
    async addCategory(param) {
      try {
        let res = await this.$http.post(`/restful/api/category/add`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 获取分类列表 */
    async getCategory(param) {
      try {
        let res = await this.$http.get(`/restful/api/category`,{params: param})
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 修改分类列表 */
    async editCategory(id) {
      try {
        let res = await this.$http.get(`/restful/api/category/edit?id=${id}`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    async editCategorySave(param) {
      try {
        let res = await this.$http.post(`/restful/api/category/edit`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 删除分类 */
    async deleteCategory(id) {
      try {
        let res = await this.$http.get(`/restful/api/category/delete?id=${id}`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 分类导航列表 */
    async getCategoryNav() {
      try {
        let res = await this.$http.get(`/restful/api/categoryNav`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 文章内容添加 */
    async addContent(param) {
      try {
        let res = await this.$http.post(`/restful/api/content/add`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 获取文章内容列表 */
    async getContent(param) {
      try {
        let res = await this.$http.get(`/restful/api/content`,{params: param})
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 修改文章列表 */
    async editContent(id) {
      try {
        let res = await this.$http.get(`/restful/api/content/edit?id=${id}`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    async editContentSave(param) {
      try {
        let res = await this.$http.post(`/restful/api/content/edit`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 文章分类 */
    async deleteContent(id) {
      try {
        let res = await this.$http.get(`/restful/api/content/delete?id=${id}`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 阅读全文 */
    async viewContent(id) {
      try {
        let res = await this.$http.get(`/restful/api/content/view?contentId=${id}`)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 提交评论 */
    async postComment(param) {
      try {
        let res = await this.$http.post(`/restful/api/content/post`, param)
        console.log(res.data)
        return res.data
      } catch (res) {
        console.log(res)
      }
    }
  }
}
