<template>
  <div class="index">

    <!-- Header -->
    <div id="header">
      <Header/>
    </div>

    <v-container>

      <!-- About -->
      <v-row id="about" class="my-8" align="center">
        <v-col cols=12 class="col-md-4 text-center">
          <v-avatar size="200">
            <img src="~static/images/ljubljana.jpg"/>
          </v-avatar>
          <h5 class="text-h5 mt-2">Lan Sovinc</h5>
          <p class="text-subtitle-1">dip. inž. rač. in inf. (UN)</p>
        </v-col>
        <v-col cols=12 class="col-md-8 text-center">
          <p class="text-body-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper porttitor ante. Duis fermentum
            libero libero, sit amet tristique neque blandit non. Nam sit amet suscipit orci, a porta tellus. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras ac risus id
            sapien rhoncus mollis a nec arcu. Sed dui lorem, egestas vitae leo eget, mattis imperdiet augue. Curabitur
            dictum, ante et placerat accumsan, velit neque maximus orci, tristique imperdiet quam ex vitae ipsum.
            Vivamus gravida odio dui, et convallis mauris rhoncus vitae.
          </p>
        </v-col>
      </v-row>

      <!-- Competences -->
      <v-row id="competences" class="my-8" align="center">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h3 text-center">Kaj počnem?</h3>
        </v-col>
        <v-col cols=12 class="col-md-4 text-center">
          <v-avatar color="primary" size="150">
            <v-icon dark size="80">
              mdi-xml
            </v-icon>
          </v-avatar>
          <h5 class="text-h5 my-3">Full Stack</h5>
          <p class="text-subtitle-1">
            A Full Stack Developer is someone who works with the Back End — or server side — of the application as well
            as the Front End, or client side.
          </p>
        </v-col>
        <v-col cols=12 class="col-md-4 text-center">
          <v-avatar color="primary" size="150">
            <v-icon dark size="80">
              mdi-xml
            </v-icon>
          </v-avatar>
          <h5 class="text-h5 my-3">Full Stack</h5>
          <p class="text-subtitle-1">
            A Full Stack Developer is someone who works with the Back End — or server side — of the application as well
            as the Front End, or client side.
          </p>
        </v-col>
        <v-col cols=12 class="col-md-4 text-center">
          <v-avatar color="primary" size="150">
            <v-icon dark size="80">
              mdi-xml
            </v-icon>
          </v-avatar>
          <h5 class="text-h5 my-3">Full Stack</h5>
          <p class="text-subtitle-1">
            A Full Stack Developer is someone who works with the Back End — or server side — of the application as well
            as the Front End, or client side.
          </p>
        </v-col>
      </v-row>

      <!-- Projects
      <v-row>
        <v-col cols="12" class="mb-4">
          <h3 class="text-h3 text-center">Delo in projekti</h3>
        </v-col>
        <v-col v-for="project in projects" :key="project.title" cols="12" md="6" lg="4" xl="3">
          <ProjectCard :projectData="project"/>
        </v-col>
      </v-row> -->


      <!-- Projects -->
      <v-row id="projects">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h3 text-center">Delo in projekti</h3>
        </v-col>
        <v-col cols="12" class="mb-4">
          <v-slide-group active-class="success" show-arrows center-active>
            <v-slide-item v-for="project in projects" :key="project.title">
              <ProjectCard class="ma-4" :projectData="project"/>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact -->
    <div id="contact">
      <ContactBlock/>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: "Test 1",
          subtitle: "Izdelava spletne strani in celostna podoba.",
          image:
            {
              src: require('~/static/images/ljubljana.jpg')
            }
        },
        {
          title: "Test 2",
          subtitle: "Izdelava spletne strani in celostna podoba.",
          image:
            {
              src: require('~/static/images/ljubljana.jpg')
            }
        },
        {
          title: "Test 3",
          subtitle: "Izdelava spletne strani in celostna podoba.",
          image:
            {
              src: require('~/static/images/ljubljana.jpg')
            }
        },
        {
          title: "Test 4",
          subtitle: "Izdelava spletne strani in celostna podoba.",
          image:
            {
              src: require('~/static/images/ljubljana.jpg')
            }
        }
      ]
    }
  }
}
</script>
