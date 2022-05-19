<template>
  <v-layout column fill-height>
    <v-app-bar
      v-show="currentWindow != 0"
      color="white"
      dense
      flat
      app
      hide-on-scroll
    >
      <v-btn class="mr-1" icon @click="currentWindow = 0">
        <v-icon color="secondary"> mdi-arrow-left </v-icon>
      </v-btn>
      {{ windowTitle }}
    </v-app-bar>
    <v-window v-model="currentWindow">
      <v-window-item>
        <UserProfileIndex
          v-show="currentWindow === 0"
          @changeWindow="updateWindow"
        />
      </v-window-item>
      <v-window-item>
        <UserProfileEdit v-show="currentWindow === 1" />
      </v-window-item>
      <v-window-item>
        <UserProfilePasswordChange v-if="currentWindow === 2" />
      </v-window-item>
      <v-window-item>
        <UserProfileEmailChange v-if="currentWindow === 3" />
      </v-window-item>
      <v-window-item>
      </v-window-item>
    </v-window>
  </v-layout>
</template>

<script>
import UserProfileEdit from "@/views/user/profile/UserProfileEdit";
import UserProfileIndex from "@/views/user/profile/UserProfileIndex";
import UserProfilePasswordChange from "@/views/user/profile/UserProfilePasswordChange";
import UserProfileEmailChange from "@/views/user/profile/UserProfileEmailChange";

export default {
  name: "UserProfile",
  components: {
    UserProfileEdit,
    UserProfileIndex,
    UserProfilePasswordChange,
    UserProfileEmailChange,
  },
  data() {
    return {
      currentWindow: 0,
      windowTitles: ["Edycja profilu", "Zmiana hasła", "Zmiana adresu e-mail"],
    };
  },
  computed: {
    windowTitle() {
      return this.windowTitles[this.currentWindow - 1];
    },
  },
  methods: {
    updateWindow(window) {
      this.currentWindow = window;
    },
  },
};
</script>

<style>
.outlined {
  border: 4px solid;
}
</style>
