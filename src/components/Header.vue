<template>
  <div style="height:180vh">
    <v-img class="parallax" height="100%" width="100%" :gradient="$vuetify.breakpoint.smAndDown ? `68deg, ${$vuetify.theme.currentTheme.primary} 20%, transparent`: `68deg, ${$vuetify.theme.currentTheme.primary} 35%, transparent`"
           style="position: sticky; top:0;">
      <v-container fill-height>
        <v-row class="white--text ma-8  ma-md-0" align="center" justify="start">
          <v-col class="white--text" cols="12" md="8" lg="6">
            <!-- Lan -->
              <h1 class="text-h4 text-md-h1" :style="lan">Lan</h1>
            <!-- Sovinc -->
            <h1 class="text-h4 text-md-h1 d-inline-block">Sovinc</h1>
            <!-- .com -->
              <h1 class="text-h4 text-md-h1 d-inline-block" :style="com">.com</h1>
          </v-col>
          <!-- Header Text -->
          <v-col cols="12" class="white--text">
              <h4 class="text-h5 text-md-h4" :style="headerText">{{ $t('homePage.header.title') }}</h4>
          </v-col>
          <!-- Header Button -->
          <v-col>
            <v-btn class="ma-1" color="accent" :x-large="$vuetify.breakpoint.mdAndUp" @click="$vuetify.goTo('#contact', {duration:3000})">
              {{ $t('homePage.header.buttonContact') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-img>

  </div>

</template>

<script>
import windowScrollPosition from '../mixins/global.js'

export default {
  mixins: [windowScrollPosition('position')],
  data() {
    return {
    }
  },
  methods: {
    // Start Tour
    startTour(target) {
      this.$vuetify.goTo(target)
    },
  },
  mounted() {
  },
  computed:{
    /* com(){
      return `opacity: ${1 - this.position[1]/400}`
    }, */
    com(){
      return `transform: translateY(${ -this.position[1]/10 }vh); opacity: ${1 - this.position[1]/400}`
    },
    lan(){
      return `transform: translateY(${ Math.max(0, 50 - this.position[1]/10) }vh); opacity: ${this.position[1]/400}`
    },
    headerText(){
      return `transform: translateY(${ Math.max(0, 50 - this.position[1]/10) }vh); opacity: ${this.position[1]/400}`
    }
  }
}
</script>

<style scoped>
.parallax {
  height: 100vh !important;

  background-image:url("~static/images/header.jpg");

  background-attachment: fixed;
  background-attachment: scroll;
  background-position: 75%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
