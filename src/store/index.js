import { createStore } from 'vuex';
import CoachesModule from '@/store/modules/coaches';
import RequestsModule from '@/store/modules/requests';

const store = createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});
export default store;
