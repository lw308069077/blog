import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Admin from '@/views/admin'
import UsersList from '@/components/UsersList'
import Category from '@/components/Category'
import AddCategory from '@/components/AddCategory'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '/',
          redirect: 'usersList'
        },
        { 
          path: 'usersList',
          component: UsersList
        },
        { 
          path: 'category',
          component: Category,
          children: [
            // {
            //   path: '/',
            //   redirect: 'add'
            // },
            {
              path: 'add',
              component: AddCategory
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('0000000000000000000000')

  // if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    // let login = 0
    // Vue.http.get('/cmp/v1/checklogin').then((res) => {
    //   login = res.data.resultCode
    //   // login = 0
    //   if (login === 0) { // 判断是否登录
    //     next()
    //   } else { // 没登录则跳转到登录界面
    //     // alert('已在其他设备登录，请重新登录')
    //     // setTimeout(() => {
    //     next({
    //       path: '/checklogin',
    //       query: {redirect: to.fullPath}
    //     })
    //     // })
    //   }
    // })
  // } else {
    next()
  // }
})


export default router