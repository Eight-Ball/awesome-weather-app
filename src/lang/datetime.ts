import {IntlDateTimeFormats} from 'vue-i18n'

export const DATE_FORMAT = 'date'

export const datetimeFormats: IntlDateTimeFormats = {
  'en': {
    [DATE_FORMAT]: {
      month: 'short', day: 'numeric', weekday: 'long'
    },
  }, 'fr': {
    [DATE_FORMAT]: {
      month: 'short', day: 'numeric', weekday: 'long'
    },
  }
}

export default datetimeFormats