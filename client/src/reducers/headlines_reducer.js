export default function headlinesReducer(state = {
  loading: false,
  hasNextPage: false,
  page: 1,
  headlines: []
}, action) {
  switch (action.type) {
    case 'LOADING_HEADLINES':

      return {
        ...state, 
        loading: true
      }

    case 'UPDATE_HEADLINES':
      console.log('reducer', action.payload)
      console.log('new state', {
        ...state,
        ...action.payload
      })
      
      return {
        ...state,
        ...action.payload
      }
      
    case 'FETCH_HEADLINES':

      return {
        ...state,
        loading: false,
        headlines: action.payload.articles,
        hasNextPage: action.payload.hasNextPage
      }

    default:
      return state;
  }
}