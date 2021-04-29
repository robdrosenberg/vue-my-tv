import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'
import TopWords from './views/TopWords.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/favorites', component: Favorites, meta: { title: 'My Favorite Episodes' } },
  { path: '/words', component: TopWords, meta: { title: 'Top Plot Words' } },
  { path: '/:path(.*)', component: NotFound },
]
