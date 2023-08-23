import mutations from '@/store/modules/coaches/mutations';
import actions from '@/store/modules/coaches/actions';
import getters from '@/store/modules/coaches/getters';

export default {
  namespace: true,
  state() {
    return {
      coaches: []
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
};
