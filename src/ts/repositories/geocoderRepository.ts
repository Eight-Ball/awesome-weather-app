import HttpClient from '@/ts/repositories/HttpClient'

export type GeocoderResponse = { data: { features: SearchItem[] } }

export type SearchItem = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: number[]
  },
  properties: {
    id: string,
    gid: string,
    layer: string,
    source: string,
    source_id: string,
    country_code: string,
    name: string,
    confidence: number,
    match_type: string,
    accuracy: string,
    country: string,
    country_gid: string,
    country_a: string,
    region: string,
    region_gid: string,
    county: string,
    county_gid: string,
    locality: string,
    locality_gid: string,
    continent: string,
    continent_gid: string,
    label: string
  },
  bbox: number[]
}

const base = 'http://pelias.smappen.com:4000/v1/autocomplete'

export default {
  get(fragment: string, lang = 'en'): Promise<GeocoderResponse> {
    return HttpClient.get(base, {
      params: {
        text: fragment,
        lang
      }
    })
  }
}
