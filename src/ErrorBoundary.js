import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    console.log({error, info})
  }

  renderAggressiveError() {
    return (
      {/* <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'url("/images/error.jpg")', backgroundSize: 'cover' }}>
          <img src="/images/repairbot.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', opacity: '0.7' }} />
          <h4 style={{ fontSize: '40px', fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '40px' }}>{`>>>Error Found<<<`}</h4>
      </div> */}
    )
  }

  render() {
    const { wrapper, row, speech, bot } = style

    if (this.state.hasError) {
      return (
        <div style={wrapper}>
          <div className="row" style={row}>
            <div className="columns small-1"><br/></div>
            <div className="columns medium-6" style={speech}>I'm sorry... this page cannot be loaded.<br /><br /><a href="/">Back to home</a></div>
            <div className="columns medium-4 end">
              <img src="https://login.commonsku.com/images/repairbot.png" style={bot} />
            </div>
          </div>
        </div>
      )
    }
    return this.props.children;
  }
}

const style = {
  wrapper: {
    background: '#E2EBF2',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  row: {
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    width: '100%' 
  },
  speech: {
    background: 'white',
    maxWidth: '450px',
    textAlign: 'center',
    padding: '100px 50px',
    borderRadius: '10px',
    fontSize: '2em'
  },
  bot: {
    marginTop: '20px'
  }
}
