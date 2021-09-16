<template>

  <!-- Card -->
  <v-card class="ma-4" max-width="320">

    <v-img :src="require(`@/static/images/${projectData.image}`)" height="200px"/>

    <v-card-title>
      {{ projectData.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ projectData.description }}
    </v-card-subtitle>

    <!-- Dialog -->
  </v-card>

</template>

<script>
export default {
  props: {
    projectData: Object
  }
}
</script>

<style scoped>

</style>
