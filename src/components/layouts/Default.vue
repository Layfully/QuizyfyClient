<template>
    <v-container fluid fill-height class="pa-0">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md5>
                <slot/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Default'
}
</script>
