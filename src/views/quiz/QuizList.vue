<template>
<div>
  <v-row justify="center" class="mx-auto" v-for="i in rowCount()" :key="i">
    <v-col v-for="quiz in itemCountInRow(i)" :key="quiz.id">
      <v-card color="grey lighten-4" style="border-top-left-radius:10px; border-top-right-radius:10px; border-bottom-left-radius:10px">
        <v-card flat :to="{name: 'Quiz', params: {'quizId': quiz.id}}">
          <v-img :src="quiz.imageUrl" :aspect-ratio="16/9">
          </v-img>
        </v-card>
        <v-card-title class="justify-center">
          {{ quiz.name }}
        </v-card-title>
        <div class="d-flex flex-nowrap align-end">
          <v-card-text class="py-0">
            <p>{{ quiz.description }}</p>
            <p>Liczba pytań: {{quiz.questions.length}}</p>
            <p>Dodano: <time :datetime="quiz.dateAdded">{{ quiz.dateAdded.split('T')[0] }}</time></p>
          </v-card-text>
          <v-card-actions>
            <div class="d-flex align-center">
              <p class="ma-0" style="white-space:nowrap">( 100000000000 )</p>
              <v-btn text large icon rounded><v-icon color="grey darken-1">mdi-thumb-up</v-icon></v-btn>
            </div>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'QuizList',
  components: {
  },
  props: {
    pageNumber: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      itemsPerRow: 2
    }
  },
  computed: mapState('Quiz', [
    'quizList'
  ]),
  mounted () {
    this.getPage(this.pageNumber)
  },
  methods: {
    ...mapActions({
      getPage: 'Quiz/getPage'
    }),
    // Think this is left for pagination : TODO
    linkGen (pageNum) {
      return this.$route.path.substring(0, this.$route.path.lastIndexOf('/')).concat(`/${pageNum}`)
    },
    itemCountInRow (index) {
      return this.quizList.items.slice((index - 1) * this.itemsPerRow, index * this.itemsPerRow)
    },
    rowCount () {
      if (this.quizList.items.length > 0) {
        return Math.ceil(this.quizList.items.length / this.itemsPerRow)
      }
      // THERE IS ERROR WITH THIS LINE WHEN QUIZ DATA IS NOT PRESENT YET
    },
    time (quiz) {
      return new Date(quiz.dateAdded)
    }
  }
}
</script>

<style scoped>

.card-img-top{
  height:275px;
  object-fit: cover;
}

.card-group-custom{
  flex-flow: row wrap;
  display: flex;
  margin: 50px auto;
  width: 80%;
}

.card-title{
  font-weight: bold;
  font-size: 1.15rem;
  color: darkslategray;
  text-transform: capitalize;
}

.card-body{
  padding: 30px;
}

.pagination-wrapper{
  width: 80%;
  margin: 0 auto;
}

.card-custom{
  width: calc(50% - 30px);
  margin: 15px;
  box-shadow: rgba(194,195,196,.4) 0 2px;
}

@media (max-width: 800px){
  .card-custom{
    width: 100%;
    margin: 10px 0;
  }
}
</style>
