<template>
  <v-card
    class="mx-auto mt-16"
    :style="`width: ${width}`"
  >
    <v-img
      :src="`/background-${dark ? 'dark' : 'light'}.jpg`"
      cover
      :height="cardHeight"
    >
      <div
        class="text-h4 pa-4"
        :style="`height: ${titleHeight}px; opacity: 0.8`"
      >
        {{ place?.properties.label ?? 'The Awesome Weather App' }}
      </div>
      <v-row
        class="ml-0"
        :style="`height: ${forecastHeight}px; width: ${width}`"
      >
        <v-col class="ml-0 overflow-x-auto">
          <Forecast
            :place="place"
            :height="forecastHeight"
            :width="desktopWidth"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Search v-model="place" />
        </v-col>
      </v-row>
    </v-img>
  </v-card>
  <v-row class="mx-auto flex-grow-0">
    <v-col>
      <v-switch
        v-model="dark"
        class="mt-1 mr-4"
        hide-details
      >
        <template #prepend>
          {{ t(DARK) }}
        </template>
      </v-switch>
    </v-col>
    <v-col>
      <div class="d-flex mt-5 pl-8">
        |
      </div>
    </v-col>
    <v-col>
      <v-select
        v-model="locale"
        :items="availableLocales"
        variant="plain"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import Search from '@/ts/components/Search.vue'
import Forecast from '@/ts/components/Forecast.vue'
import {computed, ref} from 'vue'
import {VCard, VCol, VImg, VRow, VSelect, VSwitch} from 'vuetify/components'
import {SearchItem} from '@/ts/repositories/geocoderRepository'
import {useDisplay, useTheme} from 'vuetify'
import {useI18n} from 'vue-i18n'
import {DARK} from '@/lang/messages'

const theme = useTheme()
const {availableLocales, locale, t} = useI18n()
const {mdAndUp, thresholds} = useDisplay()

const desktopWidth = `${thresholds.value.md - 16}px`
const mobileWidth = '100%'
const width = computed(() => mdAndUp.value ? desktopWidth : mobileWidth)

const titleHeight = 72
const forecastHeight = 328
const searchHeight = 40
const cardHeight = titleHeight + forecastHeight + searchHeight

const place = ref<SearchItem | null>(null)

const dark = computed({
  get: () => theme.global.current.value.dark,
  set: dark => theme.global.name.value = dark ? 'dark' : 'light'
})
</script>
