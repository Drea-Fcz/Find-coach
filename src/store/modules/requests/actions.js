export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail:payload.email,
      message: payload.message
    };
    const response =
      await fetch(`https://vue-project-fe7ba-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const responseData = response.json();
    response.id = responseData.name;
    response.coachId = responseData.coachId;

    if (!response.ok) {
      if (!response.ok) {
        throw new Error(response.message || 'Failed to post !');
      }
    }
    context.commit('addRequest', response);
  },
  async loadRequest(context) {
    const coachId = context.rootGetters.userId;
    const resp = await fetch(`https://vue-project-fe7ba-default-rtdb.firebaseio.com/requests/${coachId}.json`, {
      method: 'GET'
    });
    const respData = await resp.json();
    if (!resp.ok) {
      throw new Error(respData.message || 'Failed to fetch !');
    }
    const requests = [];
    for (const key in respData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: respData[key].userEmail,
        message: respData[key].message
      };
      requests.push(request);
      context.commit('setRequests', requests);
    }
  }
};
