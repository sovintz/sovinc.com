<template>
  <div class="appbar">

    <v-app-bar :color="scrolled ? 'primary' : 'transparent'" dark app elevate-on-scroll>

      <!-- AppBar Text Title -->
      <v-toolbar-title class="white--text text-uppercase text-center" style="cursor: pointer" @click="$vuetify.goTo('#header')">
        Sovinc.com
      </v-toolbar-title>

      <v-spacer/>

      <v-btn v-for="(item, index) in $i18n.t('navMenu')" :key="index" plain class="ma-2 hidden-sm-and-down"
             @click="$vuetify.goTo('#' + item.to)">
        {{ $t(item.title) }}
      </v-btn>

      <v-spacer/>

      <!-- Social icons-->
      <v-btn v-for="icon in icons" :key="icon" class="mx-4 lighten-1 hidden-sm-and-down" icon @click="contact(icon)">
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>

      <!-- Desktop Language Selector -->
      <v-menu offset-y>
        <!-- dropdown activator & button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2 hidden-sm-and-down" text plain v-bind="attrs" v-on="on">
            <v-avatar size="30" tile>
              <v-img eager :src="`/flags/${$i18n.locale}.svg`"/>
            </v-avatar>
          </v-btn>
        </template>


        <!-- Desktop Dropdown Rendering -->
        <v-list>
          <v-list-item
            v-for="locale in $i18n.locales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            >
            <v-list-item-icon>
              <v-avatar size="30" tile>
                <v-img eager :src="`/flags/${locale.code}.svg`"/>
              </v-avatar>
            </v-list-item-icon>

            <v-list-item-title v-text="locale.name"/>
          </v-list-item>

        </v-list>
      </v-menu>

      <!-- Mobile Navigation Icon-->
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Mobile Navigation Drawer-->
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item v-for="(item, index) in $i18n.t('navMenu')" :key="index"
                       @click="$vuetify.goTo('#' + item.to); drawer=false">
            {{ (item.title) }}
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Mobile Social icons-->
      <div class="mx-auto">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 lighten-1" icon @click="contact(icon); drawer=false">
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </div>

      <!-- Mobile Language Selector -->
      <v-menu offset-y>
        <!-- Dropdown Activator & Button -->
        <template v-slot:activator="{ on, attrs }">

          <v-list>
            <v-list-item text v-bind="attrs" v-on="on">
              <v-avatar size="30" tile>
                <v-img eager :src="`/flags/${$i18n.locale}.svg`"/>
              </v-avatar>
            </v-list-item>
          </v-list>
        </template>

        <!-- Mobile Dropdown Rendering -->
        <v-list>
          <v-list-item
            v-for="locale in $i18n.locales"
            :key="locale.code"
            nuxt
            :to="switchLocalePath(locale.code)">
            <v-list-item-icon>
              <v-avatar size="30" tile>
                <v-img eager :src="`/flags/${locale.code}.svg`"/>
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title v-text="locale.name"/>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data: () => ({
    drawer: false,
    group: null,
    scrolled: false,
    icons: [
      'mdi-email',
      'mdi-linkedin',
      'mdi-github'
    ],
  }),
  mounted() {
    window.onscroll = () => {
      this.scrolled = document.documentElement.scrollTop
    };
  },
  methods: {
    contact(contact) {
      contact = contact.split('-')[1]
      if (contact === "email") {
        window.open("mailto:lan@sovinc.com", "_blank");
      } else if (contact === "linkedin") {
        window.open("https://www.linkedin.com/in/lan-sovinc/", "_blank");
      } else if (contact === "github") {
        window.open("https://github.com/sovaCode", "_blank");
      }
    }
  }
}
</script>

<style scoped>

</style>
