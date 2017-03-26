import Immutable from 'immutable'
import { createReducer } from 'reduxsauce'
import _ from 'underscore'

import Types from '../actions/Types'

const INITIAL_STATE = Immutable.fromJS({
  errors: null,
  attempt: false,
  success: false,
  data: {},
  articles: {},
  ownArticles: {},
})

const getArticle = (state, action) => state.merge({
  errors: null,
  attempt: true,
  success: false,
  data: {},
})

const getArticleSuccess = (state, action) => {
  const article = action.payload.data
  return state.mergeDeep({
    errors: null,
    attempt: false,
    success: true,
    articles: { [article.id]: article },
    data: article,
    pagination: action.payload.data.pagination,
  })
}

const getArticleFailed = (state, action) => state.merge({
  errors: action.payload,
  attempt: false,
  success: false,
  data: {},
})

const getArticles = (state, action) => state.merge({
  errors: null,
  attempt: true,
  success: false,
  pagination: null,
})

const getArticlesSuccess = (state, action) => {
  let articles = _.filter(action.payload.data.detail, e => !e.is_owner)
  articles = _.object(_.pluck(articles, 'id'), articles)

  let ownArticles = _.filter(action.payload.data.detail, e => e.is_owner)
  ownArticles = _.object(_.pluck(ownArticles, 'id'), ownArticles)

  const newState = state.mergeDeep({
    ownArticles,
    articles,
  })

  return newState.merge({
    errors: null,
    attempt: false,
    success: true,
    pagination: action.payload.data.pagination,
  })
}

const getArticlesFailed = (state, action) => state.merge({
  errors: action.payload,
  attempt: false,
  success: false,
  data: [],
  pagination: null,
})

const addArticle = (state, action) => state.merge({
  errors: null,
  attempt: true,
  success: false,
  data: {},
})

const addArticleSuccess = (state, action) => {
  const article = action.payload.data
  return state.mergeDeep({
    errors: null,
    attempt: false,
    success: true,
    articles: { [article.id]: article },
    data: article,
    ownArticles: {
      ...state.toJSON().ownArticles,
      [action.payload.data.id]: action.payload.data,
    },
    pagination: action.payload.data.pagination,
  })
}

const addArticleFailed = (state, action) => state.merge({
  errors: action.payload,
  attempt: false,
  success: false,
  data: {},
})

const removeArticle = (state, action) => state.merge({
  errors: null,
  attempt: true,
  success: false,
})

const removeArticleSuccess = (state, action) => {
  const id = action.payload.data.id
  const ownArticles = state.toJSON().ownArticles
  delete ownArticles[id]

  return state.merge({
    errors: null,
    attempt: false,
    success: true,
    ownArticles,
  })
}

const removeArticleFailed = (state, action) => state.merge({
  errors: action.payload,
  attempt: false,
  success: false,
})


const ACTION_HANDLERS = {
  [Types.GET_ARTICLE_ATTEMPT]: getArticle,
  [Types.GET_ARTICLE_SUCCESS]: getArticleSuccess,
  [Types.GET_ARTICLE_FAILED]: getArticleFailed,
  [Types.GET_ARTICLES_ATTEMPT]: getArticles,
  [Types.GET_ARTICLES_SUCCESS]: getArticlesSuccess,
  [Types.GET_ARTICLES_FAILED]: getArticlesFailed,
  [Types.ADD_ARTICLE_ATTEMPT]: addArticle,
  [Types.ADD_ARTICLE_SUCCESS]: addArticleSuccess,
  [Types.ADD_ARTICLE_FAILED]: addArticleFailed,
  [Types.REMOVE_ARTICLE_ATTEMPT]: removeArticle,
  [Types.REMOVE_ARTICLE_SUCCESS]: removeArticleSuccess,
  [Types.REMOVE_ARTICLE_FAILED]: removeArticleFailed,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
