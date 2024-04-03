<template>
  <div
    v-if="dataError"
    class="pt-12 ml-4"
    :style="`height: ${height}px`"
  >
    {{ t(NO_DATA_AVAILABLE) }}
  </div>
  <template v-else>
    <!-- Sparkline doesn't have top labels option -->
    <v-sparkline
      :line-width="0"
      :model-value="temperatures"
      :padding="24"
      label-size="10"
      class="mx-minus-3"
      :style="`margin-top: -130px; width: ${width}`"
    >
      <template #label="item">
        {{ item.value }} °C
      </template>
    </v-sparkline>
    <v-sparkline
      :auto-line-width="false"
      :fill="false"
      :gradient="[theme.global.current.value.dark ? darkGraphColor : lightGraphColor]"
      :line-width="2"
      :model-value="temperatures"
      :padding="24"
      :smooth="true"
      auto-draw
      gradient-direction="top"
      label-size="5"
      stroke-linecap="round"
      type="trend"
      class="mx-minus-3"
      :style="`width: ${width}`"
    >
      <template #label="item">
        {{ 0 === item.index ? t(TODAY) : capitalize(d(forecast[item.index].date, DATE_FORMAT)) }}
      </template>
    </v-sparkline>
  </template>
  <v-progress-linear
    v-if="loading"
    indeterminate
  />
  <div
    v-else
    style="height: 4px"
  />
</template>

<script lang="ts" setup>
import {SearchItem} from '@/ts/repositories/geocoderRepository'
import {computed, ref, toRefs, watch} from 'vue'
import {VProgressLinear} from 'vuetify/components'
import {VSparkline} from 'vuetify/labs/VSparkline'
import forecastRepository, {ForecastItem, Position, PositionItem} from '@/ts/repositories/forecastRepository'
import {getSphericalDistance} from '@/ts/domain/Trigonometry'
import {useI18n} from 'vue-i18n'
import {NO_DATA_AVAILABLE, TODAY} from '@/lang/messages'
import {useTheme} from 'vuetify'
import {capitalize} from '@vue/shared'
import {DATE_FORMAT} from '@/lang/datetime'

const {t, d} = useI18n()
const theme = useTheme()

const props = defineProps<{
  place: SearchItem | null
  height: number
  width: number
}>()

const lightGraphColor = '#353535'
const darkGraphColor = 'white'

const {place} = toRefs(props)
watch(place, update)

const forecast = ref<{ date: Date, temperature: number }[]>([])
const temperatures = computed(() => place.value ? forecast.value.map(f => f.temperature) : [])

const loading = ref(false)
const dataError = ref(false)

async function update(): Promise<void> {
  loading.value = true
  dataError.value = false

  const position = getPosition(place.value?.geometry.coordinates)

  if (place.value && position) await updateForecast(position)
  else resetForecast()

  loading.value = false
}

function getPosition(coordinates: number[] | undefined): Position | null {
  if (!coordinates || 2 > coordinates.length) return null
  else return {lon: coordinates[0], lat: coordinates[1]}
}

async function updateForecast(position: Position): Promise<void> {
  const forecastPosition = await findForecastPosition(position)
  if (!forecastPosition) {
    console.error('Unable to find corresponding model position')
    dataError.value = true
    return
  }

  const forecast5NextDays = await forecastRepository.get5NextDays(forecastPosition)
  populateForecast(forecast5NextDays.data.results)
}

async function findForecastPosition(position: Position): Promise<Position | null> {
  const response = await forecastRepository.getAvailablePointsWithin100km(position)
  return getNearestPosition(position, response.data.results)
}

function populateForecast(forecastItems: ForecastItem[]): void {
  forecast.value = forecastItems.map(forecastItem => ({
    date: new Date(forecastItem.forecast),
    temperature: roundToOneDecimal(forecastItem.temperature)
  }))
}

function roundToOneDecimal(number: number): number {
  return Math.round(number * 10) / 10
}

function resetForecast(): void {
  forecast.value = []
}

function getNearestPosition(reference: Position, candidates: PositionItem[]): Position | null {
  let nearest: Position | null = null
  let distance = Infinity

  candidates.forEach(candidate => {
    const d = getSphericalDistance(reference, candidate.position)
    if (d < distance) {
      distance = d
      nearest = candidate.position
    }
  })

  return nearest
}
</script>

<style lang="scss" scoped>
.mx-minus-3 {
  margin-left: -12px;
  margin-right: -12px;
}
</style>