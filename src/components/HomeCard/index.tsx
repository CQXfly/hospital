import { View, Text, Image} from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { CardProps } from '../../common/HomeInterfaces'
import * as moment from 'moment'
import { convertSecondsToHoursMinutes } from "../../static/helpFuncs";

import './index.scss'

export default class HomeCardView extends Component<CardProps> {
  // constructor(props: CardProps) {
  //   super(props)
  //   let dura = convertSecondsToHoursMinutes(props.videoDuration)
  //   console.log(dura)
  // }
    render () {
      
      let dura = convertSecondsToHoursMinutes(this.props.videoDuration)
      // console.log(this.props.videoDuration, dura)
      return (
          <View className='cell'>
              <View className='content'>
                  <Text className='title'>{this.props.title}</Text>
                  <View className='sub-back'>
                      <Text className='sub-title'>{ moment(this.props.update).format('MM-DD mm:ss') }</Text>
                      <Text className='sub-title'>  时长  </Text>
                      <Text className='sub-title'>{dura}</Text>
                  </View>
                <Image className='background-icon' src='https://hospital-1253113581.cos.ap-shanghai.myqcloud.com/disease_photo/oorJj5TL7RadimTnsbbt85n0-BTU/disease_1629190318122' mode={'aspectFill'}/>
                <View className='cover' />
              </View>
          </View>
      )
    }
  }