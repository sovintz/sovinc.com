<template>
  <div class="contact-block">
    <v-container id="parent">
      <v-row class="py-4">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h4 text-md-h3  text-center">{{ $t('homePage.contactSection.title') }}</h3>
        </v-col>
        <v-col>
          <v-form ref="contactForm">
            <v-text-field
                v-model="ContactFormData.name"
                :counter="32"
                :label="$t('contactComponent.formNameLabel')"
                required
                :rules="nameRules"
            ></v-text-field>
            <v-text-field
                v-model="ContactFormData.email"
                :counter="128"
                :label="$t('contactComponent.formEmailLabel')"
                required
                :rules="emailRules"
            ></v-text-field>
            <v-textarea
                v-model="ContactFormData.message"
                :counter="1024"
                :label="$t('contactComponent.formMessageLabel')"
                required
                :rules="messageRules"
            ></v-textarea>

            <v-btn color="primary" :loading="sendingMail" :disabled="sendingMail" @click="submit">
              {{ $t('contactComponent.buttonLabel') }}
            </v-btn>

          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <!-- form submit snackbar -->
    <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout" :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">
          {{ $t('contactComponent.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>

  </div>

</template>

<script>

export default {
  data() {
    return {
      captchaSiteKey: '6LckRXAcAAAAAJZBXZHcVVUoGSS7Nnc-KGBJkKt4',
      ContactFormData: {
        name: '',
        email: '',
        message: ''
      },
      sendingMail: false,
      snackbar: {
        visible: false,
        timeout: 2000,
        color: null,
        text: '',
      },
      nameRules: [
        v => !!v || this.$i18n.t('contactComponent.errorMessages.required'),
        v => !!v && v.length <= 32 || this.$i18n.t('contactComponent.errorMessages.length32'),
      ],
      emailRules: [
        v => !!v || this.$i18n.t('contactComponent.errorMessages.required'),
        v => !!v && v.length <= 64 || this.$i18n.t('contactComponent.errorMessages.length64'),
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "E-mail address must be valid"
      ],
      messageRules: [
        v => !!v || this.$i18n.t('contactComponent.errorMessages.required'),
        v => !!v && v.length <= 1024 || this.$i18n.t('contactComponent.errorMessages.length1024'),
      ]
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e);
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    async submit() {
      try {
        await this.$recaptcha.execute('login')
        // console.log('ReCaptcha token:', token)
        this.sendMessage()

      } catch (error) {
        console.log('ReCaptcha error:', error)
        this.snackbar.text = this.$i18n.t('contactComponent.snackbar.textErr')
        this.snackbar.color = "error";
        this.snackbar.visible = true;
      }
    },
    sendMessage() {
      this.sendingMail = true

      this.$axios.post('https://formsubmit.co/ajax/lan@sovinc.com', this.ContactFormData)
        .then(() => {

          this.snackbar.text = this.$i18n.t('contactComponent.snackbar.text')
          this.snackbar.color = null;
          this.snackbar.visible = true;

          // Clear fields
          this.$refs.contactForm.reset()
        })
        .catch(() => {

          this.snackbar.text = this.$i18n.t('contactComponent.snackbar.textErr')
          this.snackbar.color = "error";
          this.snackbar.visible = true;
        })
        .finally(() => {
          this.sendingMail = false

          // Reset captcha
          this.$recaptcha.reset()
        })
    }
  }
}
</script>

<style scoped>
</style>
