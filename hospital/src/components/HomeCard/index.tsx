import { View, Text, Image} from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { CardProps } from '../../common/HomeInterfaces'

import './index.scss'

export default class HomeCardView extends Component<CardProps> {
  
    render () {
      return (
          <View className='cell'>
              <View className='content'>
                  <Text className='title'>{this.props.title}</Text>
                  <View className='sub-back'>
                      <Text className='sub-title'>{this.props.update}</Text>
                      <Text className='sub-title'> . </Text>
                      <Text className='sub-title'>100w 收藏</Text>
                  </View>
                <Image className='background-icon' src={this.props.image} mode={'aspectFill'}/>
                <View className='cover' />
              </View>
          </View>
      )
    }
  }