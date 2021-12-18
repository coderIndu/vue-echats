export default [
  {
      path: '/',
      name: 'home',
      component: () => import('@/Home.vue'), //路由懒加载
  },
];