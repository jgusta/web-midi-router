import Vue from "vue";
import Vuex from "vuex";
import log from "./modules/log";
import midi from "./modules/midi";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    log,
    midi
  }
});
