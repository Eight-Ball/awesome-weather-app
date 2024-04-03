<template>
  <v-autocomplete
    v-model:focused="focused"
    :custom-filter="() => true"
    :hide-details="true"
    :items="places"
    :label="t(PLACE)"
    auto-select-first
    clearable
    density="compact"
    item-title="properties.label"
    item-value="properties.id"
    spellcheck="false"
    variant="outlined"
    @update:search="search"
    @update:model-value="updateModel"
  />
</template>

<script lang="ts" setup>
import {VAutocomplete} from 'vuetify/components'
import {ref, watch} from 'vue'
import geocoderRepository, {SearchItem} from '@/ts/repositories/geocoderRepository'
import {useI18n} from 'vue-i18n'
import {PLACE} from '@/lang/messages'

const {t, locale} = useI18n()
watch(locale, updateModelLocale)

const model = defineModel<SearchItem | null>()

const places = ref<SearchItem[]>([])
const focused = ref(false)
const updating = ref(false)
let lastFragment: string | null = ''

async function search(fragment: string | null): Promise<void> {
  if (!focused.value // v-autocomplete set an empty string fragment on blur
    || updating.value // already updating
    || ('' !== fragment && fragment === lastFragment) // prevent sending the same request
  ) {
    updating.value = false
    return
  }
  lastFragment = fragment

  if (!fragment) reset()

  else {
    await updateAlternatives(fragment)
    selectFirstAlternative()
  }
}

async function updateAlternatives(fragment: string) {
  const response = await geocoderRepository.get(fragment, locale.value)
  if (fragment !== lastFragment) return // abort outdated updates

  places.value = response.data.features
}

function selectFirstAlternative(): void {
  model.value = 0 < places.value.length ? places.value[0] : null
}

function updateModel(id: string | null): void {
  updating.value = true // prevent @update:search to refresh data again after @update:model-value
  if (null === id) reset()
  else model.value = getPlace(id) ?? null
}

async function updateModelLocale(): Promise<void> {
  if (!model.value) return
  await updateAlternatives(model.value?.properties.label)
  selectFirstAlternative()
}

function getPlace(id: string): SearchItem | undefined {
  return places.value.find(place => id === place.properties.id)
}

function reset(): void {
  model.value = null
  places.value = []
}
</script>
