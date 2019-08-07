import React from 'react'
import HeadlineCard from '../components/HeadlineCard'
import API from '../adapters/API'
import { connect } from 'react-redux'
import { fetchHeadlines } from '../actions/headlinesActions'

class HeadlinesContainer extends React.Component {
  state = {
    headlines: [],
    savedArticles: [],
    page: 1,
    hasNextPage: false,
    loading: false
  }

  componentDidMount = () => {
    this.props.fetchHeadlines({page: this.props.page});
    window.addEventListener('scroll', this.handleScroll)
    
    if (this.props.loggedIn) API.getUserSavedArticles()
        .then(savedArticles => this.setState(savedArticles))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({page: 1}, this.getArticles(1));
    }
  }

  componnentWillUnmount = () => window.removeEventListener('scroll', this.handleScroll)

  handleScroll = () => {
    // const {hasNextPage, loading} = this.state
    const {hasNextPage, loading} = this.props
    if (loading || !hasNextPage) return;
  
    if (
      window.innerHeight + document.documentElement.scrollTop + 2500
      >= document.documentElement.offsetHeight
    ) {
      this.loadNextPage();
    }
  }

  articleType = (page) => {
    if (this.props.displayType === 'user' && this.props.loggedIn) return API.getArticles({page: this.state.page, type: 'user'})

    if (this.props.displayType === 'search') return API.getArticles({page: page ? page : this.state.page, type: this.props.displayType, search: this.props.search})

    return API.getArticles({page: this.state.page, type: 'all'})
  }

  getArticles = (page) => {
    this.articleType(page)
      .then(data => this.setState({ 
        headlines: this.state.page === 1 ? data.articles : [...this.state.headlines, ...data.articles],
        hasNextPage: data.hasNextPage,
        loading: false,
        page: this.state.page + 1
    }))
  }

  loadNextPage = () => {
    this.setState({ loading: true }, () => {
      this.getArticles();
    });
  };

  toggleSavedArticle = id => {
    if (this.state.savedArticles.includes(id)) {
      this.setState({savedArticles: this.state.savedArticles.filter(savedId => savedId !== id)})
    } else {
      this.setState({savedArticles: [...this.state.savedArticles, id]})
    }
  };

  render() {
    // const {headlines, savedArticles, hasNextPage, loading} = this.state
    const {savedArticles} = this.state
    const {headlines, hasNextPage, loading} = this.props

    return (
      <main >
        <div  style={{ marginTop: '10vh' }} />
            {headlines.length === 0 ? 
              <h1 style={{marginTop: '15vh', marginLeft: '3vh'}}>No headlines to display</h1> 
            : 
              headlines.map(headline => (
                <React.Fragment key={headline.id}>
                  <br />
                  <div style={{ display: 'flex', width: '50vw' }}>
                  <HeadlineCard key={headline.id} {...headline} savedArticles={savedArticles} toggleSavedArticle={this.toggleSavedArticle} loggedIn={this.props.loggedIn} />
                  </div>
                </React.Fragment>
              ))
            }
            <br />
            {loading &&
              <div>Loading...</div>
            }
            {(!hasNextPage &&  document.documentElement.scrollTop > 1000) &&
              <div>You did it! You reached the end!</div>
            }
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    headlines: state.headlinesReducer.headlines,
    loading: state.headlinesReducer.loading,
    page: state.headlinesReducer.page,
    hasNextPage: state.headlinesReducer.hasNextPage,
  }
}

const mapDispatchToProps = dispatch => {
  return { fetchHeadlines: props => dispatch(fetchHeadlines(props))}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadlinesContainer);