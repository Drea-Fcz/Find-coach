import { createStore } from 'vuex';
import CoachesModule from '@/store/modules/coaches';

const store = createStore({
  modules: {
    coaches: CoachesModule
  }
});
export default store;
