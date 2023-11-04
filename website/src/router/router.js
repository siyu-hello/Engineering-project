import { createRouter, createWebHistory } from 'vue-router'

// const routes = import.meta.glob('../pages/*.vue')

// const pages = Object.keys(routes).map((path) => {
//   const name = path.match(/\.\/(.*)\.vue$/)[1]
//   return {
//     path: `/${name.toLowerCase()}`,
//     component: routes[path],
//     name,
//   }
// })

const JudgeAuthor = (to) =>{
    const user = sessionStorage.getItem('username')
    if(user=='owner'){
        return '/project'
    }
    else{
        return '/record'
    }
}


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        component: () => import("../views/Login.vue")
    },
    {
        path:"/homepage",
        component: () => import("../views/HomePage.vue"),
        redirect: JudgeAuthor,
        children:[
            {
                path: "/project",
                component: () => import("../views/Project.vue")
            },
            {
                name:'projectinfo',
                path: '/projectInfo/:id/:index',
                component: () => import("../views/projectInfo.vue")
            },
            {
                path: "/record",
                component: () => import("../views/Record.vue")
            },
            {
                name:'recordinfo',
                path: '/recordInfo/:id/:index',
                component: () => import("../views/recordInfo.vue")
            },
            {
                path: "/upload",
                component: () => import("../views/Upload.vue")
            },
            {
                path: "/setting",
                component: () => import("../views/Setting.vue") 
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫
// 全局路由守卫
router.beforeEach((to, from, next) => {
    const sessionid = sessionStorage.getItem('sessionid')
    if (to.path !== '/login') {
      if (sessionid) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })

export default router
