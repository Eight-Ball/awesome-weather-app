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

const today = new Date('2024-01-02T12:00:00.000Z') // there is data from January 1st to 6th from this API

export default {
  getAvailablePointsWithin100km(position: Position): Promise<ForecastResponse<PositionItem>> {
    const select = 'position'
    const where = `${getPositionWithin1OOkmWhereClause(position)} AND ${getForecastWhereClause(today)}`
    return HttpClient.get(base, {
      params: {
        select,
        where
      }
    })
  },

  get5NextDays(position: Position): Promise<ForecastResponse<ForecastItem>> {
    const select = 'forecast, temperature'
    const where = `${getPositionExactWhereClause(position)} AND (${getForecastXNextDaysWhereClause(today, 5)})`
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

function getForecastWhereClause(date: Date): string {
  return `forecast = date'${date.toISOString().slice(0, 10)}T12:00:00'`
}

function getForecastXNextDaysWhereClause(firstDate: Date, consecutiveDays: number): string {
  const date = new Date(firstDate.getTime())
  let whereClause = ''

  for (let day = 0; day < consecutiveDays; day++) {
    if (0!== day) whereClause += ' OR '
    whereClause += getForecastWhereClause(date)
    date.setDate(date.getDate() + 1)
  }

  return whereClause
}

