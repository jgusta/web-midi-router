const state = {
  logs: []
};

const mutations = {
  log(state, payload) {
    state.logs.push(payload.msg);
  }
};

export default {
  state,
  mutations
};
