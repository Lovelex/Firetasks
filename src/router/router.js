import vue from 'vue'
import router from 'vue-router'

// Components
import Index from '@/components/Index.vue'
import AddSmoothie from '@/components/AddSmoothie.vue'

vue.use(router)

export default new router({
  mode: 'history',
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      name: 'AddSmoothie',
      path: '/add',
      component: AddSmoothie
    }
  ]
})