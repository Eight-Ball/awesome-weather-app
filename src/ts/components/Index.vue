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
      <Title
        :height="titleHeight"
        :label="place?.properties.label"
      />
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
    <Footer />
  </v-row>
</template>

<script lang="ts" setup>
import Search from '@/ts/components/Body/Search.vue'
import Forecast from '@/ts/components/Body/Forecast.vue'
import {computed, ref} from 'vue'
import {VCard, VCol, VImg, VRow} from 'vuetify/components'
import {SearchItem} from '@/ts/repositories/geocoderRepository'
import {useDisplay, useTheme} from 'vuetify'
import Title from '@/ts/components/Header/Title.vue'
import Footer from '@/ts/components/Footer/Footer.vue'

const theme = useTheme()
const {mdAndUp, thresholds} = useDisplay()

const desktopWidth = thresholds.value.md - 16
const mobileWidth = '100%'
const width = computed(() => mdAndUp.value ? `${desktopWidth}px` : mobileWidth)

const titleHeight = 72
const forecastHeight = 328
const searchHeight = 40
const cardHeight = titleHeight + forecastHeight + searchHeight

const place = ref<SearchItem | null>(null)

const dark = computed(() => theme.global.current.value.dark)
</script>
