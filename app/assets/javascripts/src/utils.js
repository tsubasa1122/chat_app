import _ from 'lodash'
import $ from './vendor/jquery'
import {CSRFToken} from './constants/app'

const Utils = {
  post: (path, params) => {
    params['authenticity_token'] = CSRFToken()
    const form = $('<form></form>')
    form.attr('method', 'post')
    form.attr('action', path)

    _.each(params, (value, key) => {
      const field = $('<input></input>')
      field.attr('type', 'hidden')
      field.attr('name', key)
      field.attr('value', value)
      form.append(field)
    })

    $(document.body).append(form)
    form.submit()
  },

  patch: (path, params) => {
    params['_method'] = 'patch'
    Utils.post(path, params)
  },

  delete: (path) => {
    const params = {'_method': 'delete'}
    Utils.post(path, params)
  },
  getShortDate(timestamp) {
    const distance = Math.round((+new Date() - timestamp) / 60000)
    const date = new Date(timestamp)

    const hour = (`0${date.getHours()}`).slice(-2)
    const minutes = (`0${date.getMinutes()}`).slice(-2)

    if (distance > 2879) {
      if (distance > 14567) {
        return this.getNiceDate(timestamp)
      } else {
        return `Yesterday at ${hour}:${minutes}`
      }
    } else {
      return `at ${hour}:${minutes}`
    }
  },
  getNiceDate(timestamp) {
    const defaultString = '%d %f%y at %h:%i'

    const language = {
      0: 'less than a minute ago',
      1: '1 minute ago',
      59: '%distance minutes ago',
      118: 'an hour ago',
      1439: '%r hours ago',
      2879: 'Yesterday at %h:%',
      14567: '%l at %h:%i',
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const date = new Date(timestamp)
    const distance = Math.round((+new Date() - timestamp) / 60000)

    let string
    for (const i in language) {
      if (distance < i) {
        string = language[i]

        break
      }
    }

    const hour = (`0${date.getHours()}`).slice(-2)
    const minutes = (`0${date.getMinutes()}`).slice(-2)
    const day = days[date.getDay()]
    const month = months[date.getMonth()]

    let year = date.getFullYear()
    if (new Date().getFullYear() === year) {
      year = ''
    }

    if (string) {
      const hoursAgo = Math.round(distance / 60)

      return string.replace(/%distance/i, distance)
        .replace(/%r/i, hoursAgo)
        .replace(/%h/i, hour)
        .replace(/%i/i, minutes)
        .replace(/%l/i, day)
    }

    return defaultString.replace(/%d/i, day)
      .replace(/%f/i, month)
      .replace(/%y/i, year)
      .replace(/%h/i, hour)
      .replace(/%i/i, minutes)
  },
}

export default Utils
