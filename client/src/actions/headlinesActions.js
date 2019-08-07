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

export const fetchHeadlines = ({page}) => {
  return dispatch => {
    dispatch(loadingHeadlines());

    return API.getArticles({page, type: 'all'})
      .then(data => dispatch(fetchHeadlinesSuccess(data)))
  };
}