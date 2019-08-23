<template>
<div>
    <b-card-text>
      {{ description }}
    </b-card-text>
    <div class="card-controls">
      <div>
          <b-button class="btn-like" size="lg" disabled pill variant="outline-secondary"><font-awesome-icon class="heart" icon="heart"/>30</b-button>
      </div>
      <div class="card-controls-buttons">
          <b-button class="btn-purple" size="lg">Dodaj do ulubionych</b-button>
          <b-button class="btn-purple" size="lg"><b-link :to="{ name: 'Quiz', params: { quizId: quizId }}">Rozwiąż</b-link></b-button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'QuizListElement',
  props: { description: { type: String, required: true }, quizId: { type: Number, required: true } }
}
</script>

<style scoped>

.card-text{
  margin-bottom: 10%;
}

a {
  text-decoration: none !important;
  color:white !important;
}

.heart{
    margin-right:10px;
}

.btn-lg{
  font-size: 1.1rem;
}

.btn-purple{
  background:#90a7d6;
  border: none;
  margin: 5px;
}

.card-controls{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.card-controls-buttons{
  display: flex;
}

@media(max-width: 1300px){
  .card-controls{
    justify-content: space-around;
  }

  .btn-like{
    margin-bottom: 10px;
  }
}

</style>
