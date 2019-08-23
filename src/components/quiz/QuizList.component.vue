<template>
  <div>
      <link rel="preconnect" href="https://localhost:5001"/>
    <b-row>
      <b-col>
        <div class="card-group-custom">
          <b-card :title="quiz.name" v-for="quiz in quizData.items" :img-src="quiz.imageUrl" :key="quiz.id"  class="card-custom" border-variant="light" img-alt="Card image" img-top>
            <QuizListElement :description='"asdasd"' :quizId="quiz.id"/>
          </b-card>
        </div>
      </b-col>
    </b-row>
     <div class="mt-3">
      <b-pagination-nav class="pagination-wrapper" :link-gen="linkGen" :number-of-pages="quizData.paging.totalPages" align="fill"></b-pagination-nav>
    </div>
  </div>
</template>
<script>
import QuizService from '@/api-services/quiz.service'
import QuizListElement from './QuizListElement.vue'

export default {
  name: 'QuizList',
  components: {
    'QuizListElement': QuizListElement
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
