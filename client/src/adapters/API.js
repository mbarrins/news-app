const apiEndpoint = 'https://news-react-project.herokuapp.com/api/v1'
const articlesUrl = `${apiEndpoint}/articles`
const sourcesUrl = `${apiEndpoint}/sources`
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`
const userSourcesUrl = `${apiEndpoint}/user_sources`
const userArticlesUrl = `${apiEndpoint}/user_articles`

const jsonify = res => {
  return res.json()     
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
  {
      'Authorization': localStorage.getItem('token'),
      ...moreHeaders
  }
)

const getArticles = ({page, type, search}) => {
  return fetch(`${articlesUrl}?page=${page}&type=${type}${search ? `&search=${search}` : ''}`, { headers: constructHeaders() })
    .then(resp => resp.json())
}

const getSources = () => {
  return fetch(sourcesUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
}

const getUsers = () => {
  return fetch(usersUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
}

const getUserSources = () => {
  return fetch(userSourcesUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
}

const signUp = (user) => fetch(usersUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data.errors}
    } else {
      localStorage.setItem('token', data.token)
      return {user: data.user}
    }
  })
  .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      console.log('errors: ',data.errors)
    } else {
      localStorage.setItem('token', data.token)
      return {user: data.user}
    }
  })
  .catch(handleServerError)

const validateUser = () => {
  if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

  return fetch(validateUrl, {
      headers: constructHeaders()
  }).then(jsonify)
      .then(data => {
          localStorage.setItem('token', data.token)
          return data.user
      })
      .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')

const postUserArticle = (article_id) => fetch(userArticlesUrl, {
  method: 'POST',
  headers: constructHeaders({'Content-Type': 'application/json'}),
  body: JSON.stringify({ article_id })
}).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data.errors}
    } else {
      return {user_article: data}
    }
  })
  .catch(handleServerError)

const deleteUserArticle = (article_id) => fetch(`${userArticlesUrl}/${article_id}`, {
  method: 'DELETE',
  headers: constructHeaders({'Content-Type': 'application/json'})
}).then(jsonify)

const getUserSavedArticles = () => fetch(userArticlesUrl, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return {errors: data.errors}
      } else {
        return { savedArticles: data.user_articles }
      }
    })
    .catch(handleServerError)

  const deleteUserSource = (userSourceId) => fetch(`${userSourcesUrl}/${userSourceId}`, {
    method: 'DELETE',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({userSourceId})
  }).then(jsonify)

  const addUserSource = sourceId => fetch(userSourcesUrl, {
    method: 'POST',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({sourceId})
  }).then(jsonify)

export default {
  signUp,
  logIn,
  validateUser,
  clearToken,
  getUsers,
  getArticles,
  getSources,
  getUserSources,
  userSourcesUrl,
  postUserArticle,
  deleteUserArticle,
  deleteUserSource,
  getUserSavedArticles,
  addUserSource
}