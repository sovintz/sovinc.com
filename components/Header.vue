<template>
  <div style="height:100vh">
    <v-img class="parallax" height="100%" :gradient="$vuetify.breakpoint.smAndDown ? '68deg, #1565C0 20%, transparent': '68deg, #1565C0 35%, transparent'">
      <v-container fill-height>
        <v-row class="white--text ma-8  ma-md-0" align="center" justify="start">
          <v-col class="white--text" cols="12" md="8" lg="6">
            <!-- Lan -->
            <transition enter-active-class="animate__animated animate__fadeInDown">
              <h1 v-if="start" class="text-h4 text-md-h1 ">Lan</h1>
            </transition>
            <h1 v-if="!start" class="text-h4 text-md-h1 font-weight-regular">&zwnj;</h1>
            <!-- Sovinc -->
            <h1 class="text-h4 text-md-h1 d-inline-block">Sovinc</h1>
            <!-- .com -->
            <transition leave-active-class="animate__animated animate__fadeOut">
              <h1 v-if="!start" class="text-h4 text-md-h1 d-inline-block">.com</h1>
            </transition>
          </v-col>
          <!-- Header Text -->
          <v-col cols="12" class="white--text">
            <transition enter-active-class="animate__animated animate__fadeInDown">
              <h4 v-if="start" class="text-h5 text-md-h4">Dobrodošli v moj svet!</h4>
            </transition>
            <h4 v-if="!start" class="text-h5 text-md-h4">&zwnj;</h4>
          </v-col>
          <!-- Header Button -->
          <v-col>
            <v-btn color="accent" :x-large="$vuetify.breakpoint.mdAndUp" :loading="loader" @click="loader=true; startTour()">
              Predstavitev
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-img>

  </div>

</template>

<script>
export default {
  data() {
    return {
      start: false,
      loader: false,
      timeout: 1500
    }
  },
  methods: {
    // Start Tour
    startTour() {
      this.start = true;
      setTimeout(() => {
        this.$vuetify.goTo('#about')
        this.loader = false;
        this.timeout = 0;
      }, this.timeout);
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.parallax {
  height: 100vh !important;

  background-image:url("~static/images/test.jpg");

  background-attachment: fixed;
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
