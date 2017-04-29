import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Actions from '../../actions/Creators'


class WordsSuggest extends React.Component {
  constructor(props) {
    super(props)

    this.onGuess = this.onGuess.bind(this)
  }

  componentWillMount() {
    this.props.getWords()
  }

  onGuess(guess) {
    this.props.guessWord({ guess }, response => {
      console.log(response)
    })
  }

  renderOption(option, active) {
    return (
      <a
        key={option.meta}
        href="#/words"
        className={`list-group-item ${active}`}
        onClick={() => { this.onGuess(option.meta) }}
      >
        {option.word}
      </a>
    )
  }

  render() {
    if (!this.props.words.success) {
      return <div>Loading..</div>
    }
    const {
      word,
      options,
    } = this.props.words.data
    return (
      <div>
        <div className="col-sm-6 offset-sm-6">
          <span className="word-description-title">Word to learn: <b>{word}</b></span>
          <div className="list-group text-center">
            {options.map(option => (this.renderOption(option)))}
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
