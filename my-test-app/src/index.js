import React from 'react'
import ReactDOM from 'react-dom'
import './index'

class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child
          ref={obj => {
            this.child = obj
          }}
        />
        <button onClick={() => this.print()} />
      </div>
    )
  }
  print() {
    this.child.add()
  }
}

class Child extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  render() {
    return <p>{this.state.count}</p>
  }
  add() {
    let count = this.state.count + 1
    this.setState({
      count: count
    })
  }
}
// ========================================

ReactDOM.render(<Parent />, document.getElementById('root'))
