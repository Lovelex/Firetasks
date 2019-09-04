<template>
  <div class="edit-smoothie container">
    <div v-if="smoothie" >
      <h2>Edit "{{smoothie.title}}"" Smoothie</h2>
      <form @submit.prevent>
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" v-model="smoothie.title" name="title" id="title">
      </div>
      <div class="delete-parent" v-for="(ingredient, index) in smoothie.ingredients" :key="index">
        <label for="ingredient">ingredient:</label>
        <input type="text" name="ingredient" id="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIngredient(index)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" v-model="another" 
          @keydown.tab.prevent="addIng"  id="add-ingredient">
          <button @click="addIng" class="btn blue addButon">Add</button>
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="isEmpty">{{report}}</p>
        <button @click="editSmoothie" class="btn pink">Update Smoothie</button>
      </div>
    </form>
    </div>
    <div v-if="!smoothie">
      <h2>Smoothie not Found</h2>
    </div>
  </div>
</template>

<script>
import fb from "@/firebase/init.js";
import slugify from 'slugify'

export default {
  name: "EditSmoothie",
  props: ["slug"],
  data() {
    return {
      smoothie: null,
      another: '',
      isEmpty: false,
      report: ''
    };
  },

  methods: {
    async getSmoothieDocBySlug() {
      const res = await fb
        .collection("smothies")
        .where("slug", "==", this.slug);

      res.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      });
    },
    editSmoothie() {
      if(!this.smoothie.title){
        this.isEmpty = true
        this.report = 'Title cannot be empty!'
        setTimeout(()=> this.report = '', 3000)
        return
      }
      
      this.isEmpty = false

      this.smoothie.slug = slugify(this.smoothie.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
      })

      fb.collection('smothies').doc(this.smoothie.id).update({
        title: this.smoothie.title,
        ingredients: this.smoothie.ingredients,
        slug: this.smoothie.slug
      }).then(() => {
        this.$router.push({ name: 'Index' })
      })
      
    },
    
    addIng() {
      const isNotEmpty = () => this.another.trim()
      if(isNotEmpty()){
        const trimedAnother = this.another.trim()
        this.smoothie.ingredients.push(trimedAnother)
        this.another = ''
        this.isEmpty = false
        
      } else {
        this.report = 'Ingredient cannot be empty!'
        this.isEmpty = true
        return
      }  
    },
    
    deleteIngredient(index) {
      this.smoothie.ingredients.splice(index, 1)
    }
  },

  created() {
    this.getSmoothieDocBySlug();
  }
};
</script>

<style>
  .edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .edit-smoothie .field {
    margin: 20px auto;
  }
  .edit-smoothie .delete-parent {
    position: relative;
  }
  .edit-smoothie .delete-parent .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>