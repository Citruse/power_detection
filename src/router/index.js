import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Warning from '../components/Warning.vue'
import Test from '../components/Test.vue'
import Person from '../components/Person.vue'

import A from '../components/A_building/a.vue'
import F1 from '../components/A_building/f1.vue'
import F2 from '../components/A_building/f2.vue'
import F3 from '../components/A_building/f3.vue'
import F4 from '../components/A_building/f4.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/warning', component: Warning },

            { path: '/test', component: Test },
            { path: '/person', component: Person },

            { path: '/A', component: A },
            { path: '/f1', component: F1 },
            { path: '/f2', component: F2 },
            { path: '/f3', component: F3 },
            { path: '/f4', component: F4 },

        ]
    }
]

const router = new VueRouter({
    routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to代表将要访问的路径
    //form代表从哪个路径跳转而来
    //next是一个函数，表示放行
    //  next() 放行 next('/login') 强制跳转

    if (to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router