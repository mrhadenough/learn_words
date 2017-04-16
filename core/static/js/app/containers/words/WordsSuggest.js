import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Actions from '../../actions/Creators'


class WordsSuggest extends React.Component {
  componentWillMount() {
    this.props.getWords()
  }
  render() {
    if (!this.props.words.success) {
      return <div>Loading..</div>
    }
    const words = this.props.words.data.results
    return (
      <div>
        <h1>WordsSuggest</h1>
        <div>
          <div>
            {words.map(word => (
              <p key={word.id}>
                {word.word} - {word.part_of_speach}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  words: state.words,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WordsSuggest))
