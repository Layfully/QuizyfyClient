<template>
  <v-card height="100%">
    <v-card-title class="flex-column pt-8">
      <v-avatar size="120" color="primary" class="elevation-2 outlined">
        <v-img
          src="https://res.cloudinary.com/junoteam/image/upload/f_auto,c_limit,w_3840,q_auto/v1620287913/team/adrian_nhy7wp.jpg"
        >
        </v-img>
      </v-avatar>
      <h1 class="text-h5 font-weight-medium mt-2">{{ user.username }}</h1>
    </v-card-title>
    <v-card-subtitle class="text-center pb-0">
      <p class="text-body-2 text--secondary mb-1">
        {{ user.firstName }} {{ user.lastName }}
      </p>
      <p class="text-body-2 text--disabled">{{ user.description }}</p>
    </v-card-subtitle>
    <v-divider />
    <v-card-text>
      <v-list>
        <v-list-item class="elevation-1 rounded-lg mb-3 py-4">
          <v-list-item-icon>
            <v-icon size="32" color="primary"> mdi-calendar-blank </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium mb-2"
              >Data dołączenia</v-list-item-title
            >
            <v-list-item-subtitle class="text--disabled"
              >19.12.2022</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="elevation-1 rounded-lg mb-3 py-4">
          <v-list-item-icon>
            <v-icon size="32" color="primary"> mdi-tooltip-check </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium mb-2"
              >Rozwiązane quizy</v-list-item-title
            >
            <v-list-item-subtitle class="text--disabled"
              >256</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="elevation-1 rounded-lg mb-3 py-4">
          <v-list-item-icon>
            <v-icon size="32" color="primary"> mdi-tooltip-plus </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium mb-2"
              >Utworzone quizy</v-list-item-title
            >
            <v-list-item-subtitle class="text--disabled"
              >128</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="$emit('changeWindow', 1)"
          class="elevation-1 rounded-lg mb-3 py-4"
        >
          <v-list-item-icon>
            <v-icon size="32" color="primary"> mdi-account-edit </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Edycja profilu
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon size="36" color="secondary"> mdi-chevron-right </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          @click="$emit('changeWindow', 2)"
          class="elevation-1 rounded-lg mb-3 py-4"
        >
          <v-list-item-icon>
            <v-icon size="32" color="primary">
              mdi-form-textbox-password</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Zmień hasło
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon size="36" color="secondary"> mdi-chevron-right </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          @click="$emit('changeWindow', 3)"
          class="elevation-1 rounded-lg py-4"
        >
          <v-list-item-icon>
            <v-icon size="32" color="primary"> mdi-email-edit </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Zmień adres e-mail
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon size="36" color="secondary"> mdi-chevron-right </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          @click.stop="deleteDialog = true"
          class="elevation-1 rounded-lg py-4"
        >
          <v-list-item-icon>
            <v-icon size="32" color="error"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium"
              >Usuń konto</v-list-item-title
            >
          </v-list-item-content>

          <v-dialog persistent v-model="deleteDialog">
            <v-card>
              <v-card-title class="text-h5 px-4"> Usuń konto </v-card-title>

              <v-card-text class="px-4">
                Czy napewno chcesz usunąć swoje konto? Zostaniesz natychmiast
                wylogowany ze swojego konta i nie będziesz w stanie zalogować
                się ponownie.
                <InputField
                  ref="passwordInput"
                  name="Hasło"
                  :additionalErrors="responseErrors"
                  :type="displayPassword ? 'text' : 'password'"
                  :appendIcon="displayPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :validationRules="{ require: true }"
                  @click-append="displayPassword = !displayPassword"
                  @input="responseErrors = []"
                  v-model="password"
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="resetDeleteDialog()"> Anuluj </v-btn>

                <v-btn
                  color="error"
                  @click="userDelete(user.id, user.username)"
                >
                  Usuń
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InputField from "@/components/InputField";

export default {
  name: "UserProfileIndex",
  components: {
    InputField,
  },
  data() {
    return {
      deleteDialog: false,
      password: "",
      displayPassword: false,
      responseErrors: [],
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    ...mapActions({
      delete: "User/delete",
    }),
    userDelete(id, username) {
      this.delete({
        id,
        credentials: { password: this.password, username },
      })
        .then(() => {
          this.deleteDialog = false;
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.responseErrors = error.response.data;
        });
    },
    resetDeleteDialog() {
      this.deleteDialog = false;
      this.password = "";
      this.responseErrors = [];
      this.$refs.passwordInput.reset();
    },
  },
};
</script>

<style>
.outlined {
  border: 4px solid;
}
</style>
