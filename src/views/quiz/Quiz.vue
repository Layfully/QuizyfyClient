<template>
  <div>
    <b-row>
      <b-col>
        <div class="card-group-custom">
          <b-card :title="quiz.name" v-for="quiz in quizzes" :key="quiz.id" class="card-custom" img-src="https://myquizhubblobcorewindowsnet-waveaccess.netdna-ssl.com/images/500/6a3cb9e7-76f3-4452-bcfd-6e0189fca0f2.jpg" border-variant="light" img-alt="Card image" img-top>
              <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </b-card-text>
              <div class="card-controls">
                <div>
                  <b-button class="btn-like" size="lg" disabled pill variant="outline-secondary"><font-awesome-icon class="heart" icon="heart"/>30</b-button>
                </div>
                <div class="card-controls-buttons">
                  <b-button class="btn-purple" size="lg"><b-link class="btn-link">Dodaj do ulubionych</b-link></b-button>
                  <b-button class="btn-purple" size="lg"><b-link class="btn-link" :to="{ name:Quiz, params: { quizId: quiz.id }}">Rozwiąż</b-link></b-button>
                </div>
              </div>
          </b-card>
        </div>
      </b-col>
    </b-row>
     <div class="mt-3">
      <b-pagination-nav class="pagination-wrapper" number-of-pages="10" base-url="#" align="fill"></b-pagination-nav>
    </div>
  </div>
</template>
<script>
import QuizService from '@/api-services/quiz.service'

export default {
  name: 'Quiz',
  props: {
    quizId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      quizzes: []
    }
  },
  created () {
    QuizService.getAll(true).then((response) => {
      this.quizzes = response.data
    })
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

.card-text{
  margin-bottom: 10%;
}

.card-controls{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.pagination-wrapper{
  width: 80%;
  margin: 0 auto;
}

.btn-lg{
  font-size: 1.1rem;
}

.btn-purple{
  background:#90a7d6;
  border: none;
  margin: 5px;
  padding: 0;
}

.btn-purple:hover {
  background:#b0c7e6 !important;
}

.btn-link{
  display: block;
  padding: 10px 13px;
}

.heart{
  margin-right:10px;
}

.card-custom{
  width: calc(50% - 30px);
  margin: 15px;
  box-shadow: rgba(194,195,196,.4) 0 2px;
}

.card-controls-buttons{
  display: flex;
}

@media(max-width: 1302.5px){
  .card-controls{
    justify-content: space-around;
  }

  .btn-like{
    margin-bottom: 10px;
  }
}

@media (max-width: 1000px){
  .card-custom{
    width: 100%;
    margin: 10px 0;
  }
}

@media(min-width: 1000px){

}
</style>
