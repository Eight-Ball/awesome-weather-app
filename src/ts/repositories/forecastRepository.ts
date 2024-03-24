import HttpClient from '@/ts/repositories/HttpClient'

const base = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/arpege-05-sp1_sp2/records'

export type ForecastResponse<I> = {
  data: {
    results: I[]
  }
}

export type PositionItem = {
  position: Position
}

export type ForecastItem = {
  forecast: IsoString
  temperature: number
}

type IsoString = string

export type Position = {
  lon: number
  lat: number
}

export default {
  getAvailablePointsWithin100km(position: Position): Promise<ForecastResponse<PositionItem>> {
    const select = 'position'
    const where = `${getPositionWithin1OOkmWhereClause(position)} AND ${getForecastTodayWhereClause()}`
    return HttpClient.get(base, {
      params: {
        select,
        where
      }
    })
  },

  get5NextDays(position: Position): Promise<ForecastResponse<ForecastItem>> {
    const select = 'forecast, temperature'
    const where = `${getPositionExactWhereClause(position)} AND (${getForecast5NextDaysWhereClause()})`
    const orderBy = 'forecast'

    return HttpClient.get(base, {
      params: {
        select,
        where,
        'order_by': orderBy
      }
    })
  }
}

function getPositionWithin1OOkmWhereClause(position: Position): string {
  // 100km is larger than the Arpege model grid at the antipodes
  return `within_distance(position, geom'POINT(${position.lon} ${position.lat})', 100km)`
}

function getPositionExactWhereClause(position: Position): string {
  // I haven't found how to query a point directly
  return `within_distance(position, geom'POINT(${position.lon} ${position.lat})', 1m)`
}

function getForecastTodayWhereClause(): string {
  return `forecast = date'2024-01-02T12:00:00'`
}

function getForecast5NextDaysWhereClause(): string {
  // I found data only up to January 6
  return `forecast = date'2024-01-02T12:00:00' 
  OR forecast = date'2024-01-03T12:00:00' 
  OR forecast = date'2024-01-04T12:00:00' 
  OR forecast = date'2024-01-05T12:00:00' 
  OR forecast = date'2024-01-06T12:00:00'`
}

