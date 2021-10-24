import { View, Text, Image} from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { PatientInfoResponse } from '../../common/NetInterface'
import { AtAvatar } from 'taro-ui'

import './index.scss'


interface MyProps {
    gender: boolean
    age: number
    name: string
    contact?: string
    address?: string
}

export default class PatientCardView extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props)
    }

    render() {
        return (
            <View className='back'>
                <View className='left-part'>
                    <View className={this.props.gender ? 'avatar-back-male' : 'avatar-back-female'}>
                    <AtAvatar className='avatar' size='large' circle text= {this.props.name} />
                    </View>
                </View>
                <View className='right-part'>
                    <View className='right-left-part'>
                        <Text className='name'>{this.props.name}</Text>
                        <Text className='age'>{this.props.age}</Text>
                    </View>
                    <View className='right-right-part'>
                        <Text className='sub-info'>{this.props.contact}</Text>
                        <Text className='sub-info'>{this.props.address}</Text>
                    </View>
                </View>
                
            </View>
        )
    }
}