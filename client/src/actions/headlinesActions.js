import API from '../adapters/API'

export const loadingHeadlines = () => {
  return {
    type: "LOADING_HEADLINES"
  }
}

export const fetchHeadlinesSuccess = (data) => {
  
  return {
    type: "FETCH_HEADLINES",
    payload: data
  }
}

export const fetchHeadlines = ({page, type}) => {
  return dispatch => {
    dispatch(loadingHeadlines());

    return API.getArticles({page, type})
      .then(data => dispatch(fetchHeadlinesSuccess(data)))
  };
}

export const updateHeadlines = data => {
  return {
    type: 'UPDATE_HEADLINES',
    payload: data
  }
}