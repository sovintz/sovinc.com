<template>
  <v-alert v-model="alert" prominent color="primary" class="mx-3 cookie"
           border="left"
           elevation="8"
           colored-border
           icon="mdi-cookie">
    <v-row align="center">
      <v-col class="text-subtitle-2">
        {{ $t('cookies.text') }}
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="shrink">
        <v-btn class="sm" color="primary" @click="accept">
          {{ $t('cookies.accept') }}
        </v-btn>
      </v-col>
      <v-col class="shrink">
        <v-btn text color="primary" @click="deny">
          {{ $t('cookies.decline') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: false
    };
  },
  methods: {
    getGDPR() {
      if (process.browser) {
        return localStorage.getItem("GDPR:accepted") ;
      }
    },
    isGDPRExpired() {
      // calculate if more than one week (604800 in epoch) passed since last cookie notice
      if (process.browser) {
        return  (new Date().getTime() - Number(localStorage.getItem("GDPR:timeout"))) > 604800 ;
      }
    },
    accept() {
      if (process.browser) {
        this.alert = false
        localStorage.setItem("GDPR:accepted", "true");

        const epoch = new Date().getTime();
        localStorage.setItem("GDPR:timeout", epoch.toString());

        this.$gtag.optIn()
      }
    },
    deny() {
      if (process.browser) {
        this.alert = false
        localStorage.setItem("GDPR:accepted", "false");

        const epoch = new Date().getTime();
        localStorage.setItem("GDPR:timeout", epoch.toString());

        this.$gtag.optOut()
      }
    },
  },
  // at element created show cookie notice only if not accepted or declined and expired after one week
  created() {
    if (!(this.getGDPR() === 'true') && this.isGDPRExpired() || this.getGDPR() === null) {
      this.alert = true;
    }
    // opt-out if GDPR is false
    else if((this.getGDPR() === 'false')){
      this.$gtag.optOut()
    }

  },
};
</script>

<style scoped>
.cookie {
  position: fixed;
  bottom: 0;
  z-index: 2;
}
</style>
