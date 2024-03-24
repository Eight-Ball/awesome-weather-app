import {Position} from '@/ts/repositories/forecastRepository'
import {EARTH_RADIUS} from '@/ts/domain/Physics'

export function getSphericalDistance(position1: Position, position2: Position): number {
  // Haversine formula, in km
  const dLat = degreeToRadian(position2.lat - position1.lat)
  const dLon = degreeToRadian(position2.lon - position1.lon)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreeToRadian(position1.lat)) * Math.cos(degreeToRadian(position2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function degreeToRadian(degree: number): number {
  return degree * (Math.PI / 180)
}
