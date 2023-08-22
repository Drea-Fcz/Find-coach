export default {
  filteredCoaches(state){
    return state.coaches;
  },
  hasCoaches(state){
    return state.coaches && state.coaches.length > 0;
  }
};
