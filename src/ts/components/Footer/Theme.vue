<template>
  <v-switch
    v-model="dark"
    class="mt-1 mr-4"
    hide-details
  >
    <template #prepend>
      {{ t(DARK) }}
    </template>
  </v-switch>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {DARK} from '@/lang/messages'
import {computed} from 'vue'
import {useTheme} from 'vuetify'
import {VSwitch} from 'vuetify/components'

const theme = useTheme()
const {t} = useI18n()

const dark = computed({
  get: () => theme.global.current.value.dark,
  set: dark => theme.global.name.value = dark ? 'dark' : 'light'
})
</script>