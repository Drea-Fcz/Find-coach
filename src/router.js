import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from '@/pages/coaches/CoachesList.vue';
import CoachesDetails from '@/pages/coaches/CoachesDetails.vue';
import Contact from '@/pages/requests/Contact.vue';
import CoachesRegistration from '@/pages/coaches/CoachesRegistration.vue';
import RequestsReceived from '@/pages/requests/RequestsReceived.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachesDetails,
      props: true,
      children: [
        {
          path: 'contact',
          component: Contact
        }
      ]
    },
    {
      path: '/register',
      component: CoachesRegistration
    },
    {
      path: '/requests',
      component: RequestsReceived
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
});

export default router;
