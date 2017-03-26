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

const create = ({ baseURL = `http://${window.HOST}/api/v1/webapp/`, token = null } = {}) => {
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
    setProfile: payload => api.put('/account/', payload),
    getProfile: () => api.get('/account/'),
    getSuggestedArticles: researcherName => api.get(`/suggested_articles/?researcher_name=${researcherName}`),
    getArticle: action => api.get(`/articles/${action}/`),
    addArticle: payload => formRequest(`${baseURL}articles/`, payload),
    removeArticle: id => api.delete(`${baseURL}articles/${id}`),
    searchSuggestedArticles: search => api.get('/suggested_articles_search/', { search }),
    signupUser: action => api.post('/signup/', action),
    checkEmail: payload => api.get('/accounts/check_email/', payload),
    sendActivationEmail: payload => api.get('/accounts/send_activation_email/', payload),
    getArticles: action => api.get('/articles/', action),
    getReadPaper: articleId => api.get(`/read_papers/${articleId}/`),
    setReadPaper: payload => api.post('/read_papers/', payload),
    removeSuggestedArticle: payload => api.delete(`/suggested_articles/${payload.researcher_id}/${payload.paper_id}/`),
    addSuggestedArticle: payload => api.post('/suggested_articles/', payload),
  }
}

export default create()
