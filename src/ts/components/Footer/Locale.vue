<template>
  <v-select
    v-model="locale"
    :items="availableLocales"
    variant="plain"
  />
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {VSelect} from 'vuetify/components'

const {availableLocales, locale} = useI18n()
</script>