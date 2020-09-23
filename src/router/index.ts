import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [

      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {

          title: "闲云旅游网"

        }
      },
      {
        path: 'Login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        path: 'hotel',
        name: 'hotel',
        component: () => import('../views/hotel.vue'),
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        path: 'ariportTicket',
        name: 'ariportTicket',
        component: () => import('../views/ariportTicket.vue'),
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        path: 'stratege',
        name: 'stratege',
        component: () => import('../views/stratege.vue'),
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        path: 'strategeDetail',
        name: 'strategeDetail',
        component: () => import('../views/strategeDetail.vue'),
        
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        path: 'ticketDetail',
        name: 'ticketDetail',
        component: () => import('../views/ticketDetail.vue'),
        
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        path: 'orderTicket',
        name: 'orderTicket',
        component: () => import('../views/orderTicket.vue'),
        
        meta: {

          title: "闲云旅游网"
        }
      },
      {
        
        path: 'write',
        name: 'write',
        component: () => import('../views/write.vue'),
        
        meta: {

          title: "闲云旅游网"
        }
      }
      
      
      



    ]

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()

})

export default router
