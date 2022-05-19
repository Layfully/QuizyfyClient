<template>
  <v-card height="100%">
    <v-divider />
    <v-card-text>
      <ValidationObserver
        ref="changEmailFormObserver"
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
            v-model="password"
          />
          <InputField
            name="Nowy adres e-mail"
            type="email"
            icon="mdi-email"
            :validationRules="{ require: true, email: true }"
            v-model="newEmail"
          />
          <v-btn
            class="mt-2"
            block
            color="primary"
            :disabled="!validated || invalid"
            @click="
              userGenerateEmailChangeToken(user.id, { newEmail })
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
        Na podany adres email został wysłany link aktywacyjny
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InputField from "@/components/InputField";
import { ValidationObserver } from "vee-validate";

export default {
  name: "UserProfileEmailChange",
  components: {
    InputField,
    ValidationObserver,
  },
  data() {
    return {
      password: "",
      newEmail: "",
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
      generateEmailChangeToken: "User/generateEmailChangeToken",
    }),
    userGenerateEmailChangeToken(id, data) {
      this.generateEmailChangeToken({
        id,
        credentials: { username: this.user.username, password: this.password },
        data,
      })
        .then(() => {
          this.showSuccessAlert = true;
          this.password = "";
          this.newEmail = "";
          this.displayPassword = false;
          requestAnimationFrame(() => {
            this.$refs.changEmailFormObserver.reset();
          });
          this.hideAlert();
        })
        .catch((error) => {
          this.responseErrors = error.response.data;
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
