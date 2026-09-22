import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import ONama from '@/views/ONama.vue';
import Nalog from '../views/Nalog.vue'
import Katalog from '@/views/Katalog.vue';
import Galerija from '@/views/Galerija.vue';
import DetaljiIgre from '@/views/DetaljiIgre.vue';
import Login from '../views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Pocetna',
      component: Pocetna,
      meta: { 
        title: 'Početna',
        breadcrumbs: [{ text: 'Početna', link: '/' }] 
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { 
        title: 'Login',
        breadcrumbs: [{ text: 'Početna', link: '/' }, { text: 'Login' }] 
      }
    },
    {
      path: '/mojnalog',
      name: 'Nalog',
      component: Nalog,
      meta: { 
        title: 'Moj Nalog',
        breadcrumbs: [{ text: 'Početna', link: '/' }, { text: 'Moj Nalog' }] 
      }
    },
    {
      path: '/onama',
      name: 'ONama',
      component: ONama,
      meta: { 
        title: 'O Nama',
        breadcrumbs: [{ text: 'Početna', link: '/' }, { text: 'O Nama' }] 
      }
    },
    {
      path: '/katalog',
      name: 'Katalog',
      component: Katalog,
      meta: { 
        title: 'Katalog',
        breadcrumbs: [{ text: 'Početna', link: '/' }, { text: 'Katalog' }] 
      }
    },
    {
      path: '/galerija',
      name: 'Galerija',
      component: Galerija,
      meta: { 
        title: 'Galerija',
        breadcrumbs: [{ text: 'Početna', link: '/' }, { text: 'Galerija' }] 
      }
    },
    {
      path: '/detaljiigre/:id',
      name: 'DetaljiIgre',
      component: DetaljiIgre,
      meta: { 
        title: 'Detalji Igre',
        breadcrumbs: [
          { text: 'Početna', link: '/' }, 
          { text: 'Katalog', link: '/katalog' }, 
          { text: 'Detalji igre' }
        ]
      },
      props: true
    }
  ],
})

router.beforeEach((to, from) => {
  const prez = 'Prodavnica društvenih igara';
  const strana = to.meta.title;
  
  document.title = `${prez} - ${strana}`;
  
  // next(); treba i parametar next ali je ovo izgleda ipak staro :<
  return true;
});

export default router
