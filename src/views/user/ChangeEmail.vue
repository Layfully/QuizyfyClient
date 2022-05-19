<template>
  <div>gut</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ChangeEmail",
  mounted() {
    this.userChangeEmail(this.$route.query.id, {
      newEmail: this.$route.query.email,
      token: this.$route.query.emailChangeToken,
    });
  },
  methods: {
    ...mapActions({
      changeEmail: "User/changeEmail",
    }),
    userChangeEmail(id, data) {
      this.changeEmail({
        id,
        data,
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>