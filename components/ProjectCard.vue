<template>

  <!-- Card -->
  <v-card class="ma-auto d-flex flex-column" max-width="320">

    <v-img min-height="250" max-height="250" height="200px" :src="require(`@/static/images/${projectData.image}`)" :alt="projectData.altText"/>

    <v-card-title class="text">
      {{ projectData.title }}
    </v-card-title>

    <v-card-subtitle class="text-wrap">
      {{ projectData.description }}
    </v-card-subtitle>

    <v-spacer/>

    <v-card-actions v-if="projectData.link">
      <v-btn text color="primary" @click="openLink(projectData.link);">{{ $t('homePage.projectsSection.button') }}</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  props: {
    projectData: Object
  },
  methods:{
    openLink(link){
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
