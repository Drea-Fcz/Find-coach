export default {
  receivedRequests(state,_,_2, rootGetters) {
    return state.requests.filter(req => req.coachId === rootGetters.userId );
  },
  hasRequest(_, getters){
    return getters.requests && getters.requests.length > 0;
  },
};
