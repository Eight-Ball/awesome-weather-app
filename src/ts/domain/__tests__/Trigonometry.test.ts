import {degreeToRadian, getSphericalDistance} from '@/ts/domain/Trigonometry'

describe('Trigonometry', () => {
  test('Spherical distance in km', () => {
    expect(getSphericalDistance({lat: 0, lon: 0}, {lat: 0, lon: 0})).toEqual(0)
    expect(getSphericalDistance({lat: 90, lon: 0}, {lat: 0, lon: 0})).toEqual(10007.543398010286)
    expect(getSphericalDistance({lat: 43, lon: 27}, {lat: 0, lon: 0})).toEqual(5485.753366003908)
    expect(getSphericalDistance({lat: -90, lon: 0}, {lat: 0, lon: 0})).toEqual(10007.543398010286)
  })
  test('Degree to radian', () => {
    expect(degreeToRadian(0)).toEqual(0)
    expect(degreeToRadian(33)).toEqual(0.5759586531581288)
    expect(degreeToRadian(45)).toEqual(0.7853981633974483)
    expect(degreeToRadian(90)).toEqual(1.5707963267948966)
    expect(degreeToRadian(360)).toEqual(6.283185307179586)
  })
})
