import React from 'react'

export default React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    title: React.PropTypes.string,
    text: React.PropTypes.string
  },
  render() {
    let classes = `alert alert-${this.props.type}`
    let {title, text} = this.props
    return <div className={classes} role="alert">
      <strong>{title}</strong> {text}
    </div>
  }
})
