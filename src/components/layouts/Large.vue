<template>
    <v-container fluid fill-height class="pa-0">
        <v-layout align-center justify-center>
            <v-flex xs11 sm9 md6>
                <slot/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Large'
}
</script>
