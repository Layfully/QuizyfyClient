<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card hover v-for="quiz  in quizData.items" :key="quiz.id">
          <v-img :src="quiz.imageUrl" :aspect-ratio="11/9">
          </v-img>
          <v-card-title>
            {{ quiz.name }}
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import QuizService from '@/api-services/quiz.service'

export default {
  name: 'QuizList',
  components: {
  },
  data () {
    return {
      quizData: {
        paging: {
          pageSize: 2,
          pageNumber: 1
        }
      }
    }
  },
  created () {
    QuizService
      .getAll(this.$route.params.pageNumber, this.quizData.paging.pageSize)
      .then((response) => {
        this.quizData = response.data
      })
  },
  methods: {
    linkGen (pageNum) {
      return this.$route.path.substring(0, this.$route.path.lastIndexOf('/')).concat(`/${pageNum}`)
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
