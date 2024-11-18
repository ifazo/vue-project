import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/lib/firebase';
import { useToast } from 'primevue/usetoast';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue')
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue')
    },
    {
      path: '/categories/:slug',
      name: 'category',
      component: () => import('@/views/CategoryView.vue')
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/SuccessView.vue')
    },
    {
      path: '/cancel',
      name: 'cancel',
      component: () => import('@/views/CancelView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const toast = useToast();
    if (auth.currentUser) {
      next();
    } else {
      toast.add({ severity: 'warn', summary: 'Warning', detail: "Sign in to view Dashboard", life: 3000 })
      next({ name: "signin" });
    }
  } else {
    next();
  }
});

export default router
