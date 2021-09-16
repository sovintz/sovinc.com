<template>
  <div class="contact-block">
    <v-container id="parent">
      <v-row class="py-4">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h3 text-center">{{ $t('homePage.contactSection.title') }}</h3>
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

            <!-- captcha for button -->
            <!--<vue-recaptcha :sitekey="captchaSiteKey" ref="invisibleRecaptcha" @verify="onVerify" @expired="onExpired" size="invisible"/>-->

            <v-btn color="primary" @click="submit" :loading="sendingMail" :disabled="sendingMail">
              {{ $t('contactComponent.buttonLabel') }}
            </v-btn>

          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <!-- form submit snackbar -->
    <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout" :color="snackbar.color">
      {{ $t('contactComponent.buttonLabel') }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">
          {{ $t('contactComponent.snackbarClose') }}
        </v-btn>
      </template>
    </v-snackbar>

  </div>

</template>

<script>
// import axios from "axios";
// import VueRecaptcha from 'vue-recaptcha';

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
  methods: {
    contact(contact) {
      if (contact === "phone") {
        window.location.href = "tel:+38640831418";
      }
      else if (contact === "email") {
        window.open("mailto:info@pikado.si", "_blank");
      }
      else if (contact === "map") {
        window.open("https://goo.gl/maps/j9Ay2VfwQDLbyMmu7", "_blank");
      }
    },
    submit() {

      // validate form and start captcha
      if (this.$refs.contactForm.validate()) {
        this.$refs.invisibleRecaptcha.execute()
      }
      console.log("test")
    },
    // TODO: fix captcha
  }
}
</script>

<style scoped>
/* Has to be duplicated, otherwise does not work*/
.hov:hover > * {
  transition: color 0.2s ease-out !important;
  color: #01b034 !important;
}
</style>
