import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import('../generated-components/components/hello-world.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../generated-components/components/todo-app.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../generated-components/components/dashboard.vue'),
    },
  ],
});

export default router;
