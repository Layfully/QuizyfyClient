<template>
  <v-card height="100%">
    <v-divider />
    <v-card-text>
      <ValidationObserver
        ref="changePasswordFormObserver"
        v-slot="{ invalid, validated }"
      >
        <v-form>
          <InputField
            name="Bieżące hasło"
            icon="mdi-lock"
            :additionalErrors="responseErrors"
            :type="displayPassword ? 'text' : 'password'"
            :appendIcon="displayPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :validationRules="{ require: true }"
            @click-append="displayPassword = !displayPassword"
            @input="responseErrors = []"
            v-model="currentPassword"
          />

          <PasswordField
            name="Nowe hasło"
            icon="mdi-lock-plus"
            :type="displayPassword ? 'text' : 'password'"
            :validationRules="{require: true,between: [8, 1024],passwordMatch: 'Potwierdzenie nowego hasła'}"
            v-model="newPassword"
          />
          <InputField
            name="Potwierdzenie nowego hasła"
            icon="mdi-lock-check"
            :type="displayPassword ? 'text' : 'password'"
            :validationRules="{ require: true }"
            v-model="confirmedPassword"
          />
          <v-btn
            class="mt-2"
            block
            color="primary"
            :disabled="!validated || invalid"
            @click="
              userUpdate(user.id, { currentUsername: user.username, currentPassword: currentPassword, password: newPassword })
            "
          >
            Zapisz zmiany
          </v-btn>
        </v-form>
      </ValidationObserver>
      <v-alert
        :transition="
          showSuccessAlert ? 'slide-x-reverse-transition' : 'slide-x-transition'
        "
        v-show="showSuccessAlert"
        class="mt-4"
        text
        dense
        type="success"
      >
        Zmiany zostały zostały zapisane
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import { ValidationObserver } from "vee-validate";

export default {
  name: "UserProfilePasswordChange",
  components: {
    InputField,
    PasswordField,
    ValidationObserver,
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
      displayPassword: false,
      showSuccessAlert: false,
      responseErrors: [],
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    ...mapActions({
      update: "User/update",
      login: "User/login",
    }),
    userUpdate(id, data) {
      this.update({
        id,
        data,
      })
        .then(() => {
          this.showSuccessAlert = true;
          this.currentPassword = "";
          this.confirmedPassword = "";
          this.newPassword = "";
          this.displayPassword = false;
          requestAnimationFrame(() => {
            this.$refs.changePasswordFormObserver.reset();
          });
          this.hideAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    hideAlert() {
      window.setTimeout(() => {
        this.showSuccessAlert = false;
      }, 3000);
    },
  },
};
</script>

<style>
.outlined {
  border: 4px solid;
}
</style>
