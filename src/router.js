// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './components/HomeComponent.vue';
import WaitingRoomComponent from './components/WaitingRoomComponent.vue';
import ChatRoomComponent from './components/ChatRoomComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
  },
  {
    path: '/w/:meetingId',
    name: 'WaitingRoom',
    component: WaitingRoomComponent,
    props: true,
  },
  {
    path: '/c/:meetingId/:name/:language',
    name: 'ChatRoom',
    component: ChatRoomComponent,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
