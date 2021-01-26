import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue' // Finished
import Logout from '../views/auth/Logout.vue'
import Jobs from '../views/jobs/Jobs.vue' // Finished
import CreateJob from '../views/jobs/CreateJob.vue' // Finished
import ShowJob from '../views/jobs/ShowJob.vue' // Finished
import EditJob from '../views/jobs/EditJob.vue' // Finished
import JobImages from '../views/jobs/Images.vue' // Finished
import Addresses from '../views/addresses/Addresses.vue'
import CreateAddress from '../views/addresses/CreateAddress.vue'
import ShowAddress from '../views/addresses/ShowAddress.vue'
import EditAddress from '../views/addresses/EditAddress.vue'
import Services from '../views/services/Services.vue'
import ShowService from '../views/services/ShowService.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register},
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/jobs', component: Jobs },
  { path: '/jobs/create/:service?', component: CreateJob },
  { path: '/jobs/:job', component: ShowJob },
  { path: '/jobs/:job/edit', component: EditJob },
  { path: '/jobs/:job/images', component: JobImages },
  { path: '/addresses', component: Addresses },
  { path: '/addresses/create', component: CreateAddress },
  { path: '/addresses/:address', component: ShowAddress },
  { path: '/addresses/:address/edit', component: EditAddress },
  { path: '/services/', component: Services },
  { path: '/services/:service', component: ShowService },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
