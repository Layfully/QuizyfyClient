<template>
  <v-card height="100%">
    <v-divider />
    <v-card-title class="justify-center text-center pb-0 my-2">
      <v-badge icon="mdi-pencil" offset-x="25" offset-y="25" bordered overlap>
        <v-avatar size="120" color="primary" class="elevation-2 outlined">
          <v-img
            src="https://res.cloudinary.com/junoteam/image/upload/f_auto,c_limit,w_3840,q_auto/v1620287913/team/adrian_nhy7wp.jpg"
          >
          </v-img>
        </v-avatar>
      </v-badge>
    </v-card-title>
    <v-card-text>
      <ValidationObserver ref="changePasswordFormObserver" v-slot="{ invalid }">
        <v-form>
          <InputField
            name="Imię"
            type="text"
            v-model="firstName"
            :validationRules="{}"
          />
          <InputField
            name="Nazwisko"
            type="text"
            v-model="lastName"
            :validationRules="{}"
          />
          <InputTextArea
            class="mt-4"
            name="O mnie"
            type="text"
            outlined
            dense
            clearable
            auto-grow
            
            counter
            :validationRules="{}"
            v-model="description"
          />
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
          <v-btn
            block
            color="primary"
            :disabled="invalid"
            @click="
              userUpdate(user.id, {
                firstName,
                lastName,
                description,
              })
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
import InputTextArea from "@/components/InputTextArea";
import { ValidationObserver } from "vee-validate";

export default {
  name: "UserProfileEdit",
  components: {
    InputField,
    InputTextArea,
    ValidationObserver,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      password: "",
      showSuccessAlert: false,
      displayPassword: false,
      responseErrors: [],
    };
  },
  mounted() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.description = this.user.description;
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    ...mapActions({
      update: "User/update",
    }),
    userUpdate(id, data) {
      this.update({
        id,
        data,
        credentials: { username: this.user.username, password: this.password }
      })
        .then(() => {
          this.showSuccessAlert = true;
          this.password = "";
          this.displayPassword = false;
          this.hideAlert();
        })
        .catch((error) => {
          console.log(error);
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
