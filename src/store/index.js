import { createStore } from "vuex";
import firebase from "@/firebaseConfig";

const db = firebase.firestore();

export default createStore({
  state: {
    favorites: [],
  },
  actions: {
    async getFavorites(context) {
      await db.collection("favorites")
        .onSnapshot((querySnapShot) => {
          var favorites = querySnapShot.docs.map((doc) => doc.data())
          context.commit("updateFavorites", favorites)
        })
    }
  },
  mutations: {
    updateFavorites(state, data) {
      console.log("ITS MUTATING")
      state.favorites = data
    }
  }
});