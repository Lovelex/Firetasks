<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent>
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" v-model="title" name="title" id="title">
      </div>
      <div v-for="(ingredient, index) in ingredients" :key="index">
        <label for="ingredient">ingredient:</label>
        <input type="text" name="ingredient" id="ingredient" v-model="ingredients[index]">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" v-model="another" 
          @keydown.tab.prevent="addIng"  id="add-ingredient">
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="isEmpty">{{report}}</p>
        <button @click="submitSmoothie" class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import fb from '@/firebase/init.js'
import slugify from 'slugify'

export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: '',
      slug: '',
      another: '',
      ingredients: [],
      isEmpty: false,
      report: ''
    }
  },

  methods: {
    submitSmoothie() {
      if(!title){
        this.report = 'Title cannot be empty!'
        setTimeout(()=> this.report = '', 3000)
        return
      }
      
      this.slug = slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
      })

      fb.collection('smothies').add({
        title: this.title,
        ingredients: this.ingredients,
        slug: this.slug
      }).then(() => {
        this.$router.push({ name: 'Index' })
      })
    },
    addIng() {
      const isNotEmpty = () => this.another.trim()
      if(isNotEmpty()){
        const trimedAnother = this.another.trim()
        this.ingredients.push(trimedAnother)
        this.another = ''
        this.isEmpty = false
        
      } else {
        this.report = 'Ingredient cannot be empty!'
        this.isEmpty = true
        return
      }  
    }
  },

}
</script>

<style>
  .add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .add-smoothie .field {
    margin: 20px auto;
  }
</style>