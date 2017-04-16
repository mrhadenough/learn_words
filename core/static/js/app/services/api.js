/* globals window, $, FormData */

import apisauce from 'apisauce'
import _ from 'underscore'

import { getCookie } from './utils'

const formRequest = (url, payload) => {
  const data = new FormData()
  _.chain(payload)
    .pairs()
    .filter(e => e[1] !== null && e[1] !== '')
    .map(pair => data.append(pair[0], pair[1]))
  const deferred = $.Deferred()
  $.ajax({
    data,
    url,
    type: 'POST',
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
    beforeSend: (request) => {
      request.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
    },
    success: response => {
      deferred.resolve({
        ok: true,
        data: response,
      })
    },
    error: response => {
      deferred.reject({
        ok: false,
        data: response,
      })
    },
  })
  return deferred.promise()
}

const create = ({ baseURL = `http://${window.HOST}/api/v1`, token = null } = {}) => {
  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  }
  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 50000,
  })

  return {
    getWords: () => api.get('/words/'),
    login: payload => api.post('/account/', payload),
  }
}

export default create()
