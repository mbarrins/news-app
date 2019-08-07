export default function headlinesReducer(state = {
  loading: false,
  hasNextPage: false,
  page: 1,
  headlines: []
}, action) {
  switch (action.type) {
    case 'LOADING_HEADLINES':

      return {...state, loading: true}
      
    case 'FETCH_HEADLINES':

      return {
        ...state,
        loading: false,
        page: state.page + 1,
        headlines: action.payload.articles,
        hasNextPage: action.payload.hasNextPage
      }

    default:
      return state;
  }
}