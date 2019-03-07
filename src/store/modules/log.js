const state = {
  log: []
};

const mutations = {
  log(state, payload) {
    state.log.push(payload.msg);
  }
};

export default {
  state,
  mutations
};
