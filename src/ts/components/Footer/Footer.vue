<template>
  <v-col>
    <Theme />
  </v-col>
  <v-col>
    <div class="d-flex mt-5 pl-8">
      |
    </div>
  </v-col>
  <v-col>
    <Locale />
  </v-col>
</template>

<script setup lang="ts">
import Theme from '@/ts/components/Footer/Theme.vue'
import Locale from '@/ts/components/Footer/Locale.vue'
import {VCol} from 'vuetify/components'
</script>