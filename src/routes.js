import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/favorites', component: Favorites, meta: { title: 'My Favorite Episodes' } },
  { path: '/:path(.*)', component: NotFound },
]
