export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
    const response = await fetch(`https://vue-project-fe7ba-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    // const responseData = await response.json();

    if (!response.ok) {
      throw new Error(response.message || 'Failed to post !');
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context) {
    const resp = await fetch(`https://vue-project-fe7ba-default-rtdb.firebaseio.com/coaches.json`, {
      method: 'GET'
    });
    const respData = await resp.json();
    if (!resp.ok) {
      throw new Error(respData.message || 'Failed to fetch !');
    }
    const coaches = [];
    for (const key in respData) {
      const coach = {
        id: key,
        firstName: respData[key].firstName,
        lastName: respData[key].lastName,
        description: respData[key].description,
        hourlyRate: respData[key].hourlyRate,
        areas: respData[key].areas
      }
      coaches.push(coach);
      context.commit('setCoaches', coaches);
    }
  }
};
