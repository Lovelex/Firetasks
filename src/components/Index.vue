<template>
  <div class="index container" v-if="smoothiesLength">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="delete material-icons" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <router-link :to="{ name: 'EditSmoothie', params: { slug: smoothie.slug } }">
        <span class="btn-floating btn-large halfway-fab pink">
          <i class="edit material-icons">edit</i>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import fb from "@/firebase/init.js";

export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },

  methods: {
    deleteSmoothie(id, index) {
      fb.collection("smothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies.splice(index, 1);
        })
        .catch(() => {});
    },
    async getSmoothiesFromFirebase() {
      await fb
        .collection("smothies")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const smoothie = doc.data();
            smoothie.id = doc.id;
            this.smoothies.push(smoothie);
          });
        });
    }
  },

  computed: {
    smoothiesLength() {
      return this.smoothies.length;
    }
  },

  created() {
    this.getSmoothiesFromFirebase();
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 10px;
}

.index .card .card-content .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.index .card .card-content .delete:hover {
  transition: color 0.25s;
  color: #444;
  border-radius: 100%;
}

.index .card .card-content .indigo-text {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .card .card-content .ingredients {
  margin: 30px auto;
}

.index .card .card-content .ingredients li {
  display: inline-block;
}
</style>