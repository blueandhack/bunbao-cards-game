import React, { Component } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import { Row, Col, Button, Alert } from 'antd'
import _ from 'lodash'
import BaoCard from './BaoCard'
// import PropTypes from 'prop-types'

export class CardsTable extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      count: 0,
      data: [
        { key: 1, image: 1, content: 'pork' },
        { key: 2, image: 2, content: 'sweet' },
        { key: 3, image: 1, content: 'curry' },
        { key: 4, image: 2, content: 'lamb' },
        { key: 5, image: 1, content: 'curry' },
        { key: 6, image: 2, content: 'lamb' }
      ]
    }
  }

  componentDidMount() {
    this.shuffle()
  }

  shuffle = () =>
    this.setState(({ data }) => ({
      data: _.shuffle(data)
    }))

  resetStatus = () => {}

  checkCount = () => {
    if (this.state.count >= 2) {
      return false
    } else {
      return true
    }
  }

  counter = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })
  }

  render() {
    return (
      <div>
        <h2>来抽包包卡牌吧！</h2>
        <Alert
          message={'你还有' + (2 - this.state.count) + '次机会'}
          style={{ margin: '10px 0' }}
        />
        <Button onClick={this.shuffle} type="primary">
          随机一下
        </Button>
        <Flipper flipKey={this.state.data}>
          <Row gutter={10}>
            {this.state.data.map(item => (
              <Col span={12} key={item.key}>
                <Flipped flipId={item.key}>
                  {flippedProps => {
                    return (
                      <BaoCard
                        item={item}
                        flippedProps={flippedProps}
                        counter={this.counter}
                        checkCount={this.checkCount}
                      />
                    )
                  }}
                </Flipped>
              </Col>
            ))}
          </Row>
        </Flipper>
      </div>
    )
  }
}

export default CardsTable
