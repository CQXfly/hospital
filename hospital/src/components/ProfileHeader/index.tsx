import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

// import {PatientModel} from '../../common/NetInterface'
import './index.scss'
// import "taro-ui/dist/style/components/avatar.scss";

import arrow from '../../images/left_arrow.png'

interface SimpleProp {
    name: string
    age: number
    avatar: string
}

export default class Header extends Component<SimpleProp> {
    onImageClick() {
        Taro.previewImage({
            urls:[this.props.avatar]
        })
    }
    render () {
        return (
            <View className='back'>
                <View className='left-part'>
                    {this.props.avatar.length > 0 ? (
                        <Image className='avatar' src={this.props.avatar} onClick={this.onImageClick} ></Image>
                    ) : (<AtAvatar size='large' circle text= {this.props.name} />)}
                    <View className='simple-info'>
                        <Text className='name'>{this.props.name}</Text>
                        <Text className='age'>{this.props.age}</Text>
                    </View>
                </View>
                <View className='right-part'>
                    <Text className='edit'>编辑信息</Text>
                    <Image className='arrow' src={arrow}></Image>
                </View>
            </View>
        )
    }
}