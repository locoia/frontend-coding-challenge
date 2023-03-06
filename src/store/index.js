import { createStore } from 'vuex'
import { getAll } from "@/api/peopleApi";
import router from "@/router";
export default createStore({
  state: () => ({
    loading: false,
    data: [],
    error: null,
    //winners: [] to work without persistence uncomment this line and comment the following line
    winners: JSON.parse(localStorage.getItem("WINNERS")) ? JSON.parse(localStorage.getItem("WINNERS")) : []
  }),
  getters: {
    DATA: (state) => state.data,
    WINNERS: (state) => state.winners,
    DATA_LOADING: (state) => state.loading,
    ERROR: (state) => state.error,
  },
  actions: {
    GET_DATA: ({ commit }) => {
      getAll()
        .then((data) => {
          commit("SET_DATA", data);
        })
        .catch((err) => {
          commit("SET_ERROR", err);
          router.push("/error");
        });
    },
    ADD_WINNERS: ({ commit }, payload) => {
      commit("SET_WINNER", payload);
      
    },
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_DATA(state, payload) {
      state.data = payload;
    },
    SET_WINNER(state, payload) {
      state.winners.push({ name: payload });
      localStorage.setItem("WINNERS", JSON.stringify(state.winners));
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
  }
})
