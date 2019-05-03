import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip'
import { notification, Button } from 'antd'
import './BaoCard.css'
import cardOne from './assets/images/baoziOne.png'
import cardTwo from './assets/images/baoziTwo.png'
import sweet from './assets/images/sweet.jpg'
import pork from './assets/images/pork.jpg'
import curry from './assets/images/curry.jpg'
import lamb from './assets/images/lamb.jpg'
// import PropTypes from 'prop-types'

export class BaoCard extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      isFlipped: false
    }
  }

  handleClick = e => {
    e.preventDefault()
    if (this.props.checkCount()) {
      this.props.counter()
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
    } else {
      const key = `open${Date.now()}`
      const btn = (
        <Button size="small" onClick={() => notification.close(key)}>
          Share
        </Button>
      )
      notification.open({
        message: '抱歉您的次数已经用完',
        description: '分享给朋友获取更多抽奖次数',
        btn,
        key
      })
    }
  }

  render() {
    return (
      <div
        style={{ margin: '10px 0', width: '100%' }}
        {...this.props.flippedProps}
      >
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal"
        >
          <div key="front" className="baoCard" onClick={this.handleClick}>
            <img
              src={this.props.item.image === 1 ? cardOne : cardTwo}
              alt="card"
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: 'black',
                padding: '5px',
                objectFit: 'cover'
              }}
            />
          </div>
          <div key="back" className="baoCard" onClick={this.handleClick}>
            <img
              src={(() => {
                switch (this.props.item.content) {
                  case 'sweet':
                    return sweet
                  case 'pork':
                    return pork
                  case 'curry':
                    return curry
                  case 'lamb':
                    return lamb
                  default:
                    return sweet
                }
              })()}
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: 'black',
                padding: '5px',
                objectFit: 'cover'
              }}
              alt="content"
            />
          </div>
        </ReactCardFlip>
      </div>
    )
  }
}

export default BaoCard
