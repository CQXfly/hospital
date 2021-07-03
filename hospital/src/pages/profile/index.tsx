import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Header } from '../../components'
import { AtGrid } from "taro-ui"

import {PatientModel} from '../../common/NetInterface'
import './index.scss'
import 'taro-ui/dist/style/components/grid.scss'
import info from '../../images/profile/profile_info.png'
import doctor from '../../images/profile/profile_doctor.png'
import signin from '../../images/profile/profile_signin.png'
import settings from '../../images/profile/profile_settings.png'



export default class Mine extends Component<PatientModel> {
    config = {
        navigationBarTitleText: '我的'
    }
    selectItem(obj, index) {
        if (index == 2) {
            Taro.navigateTo({
                url: '/pages/signin/signin'
            })
        }
        console.log(index, obj)
    }
    render() {
        return (
            <View className='mine-back'>
                <Header avatar={this.props.avatar} name={"test"} age={40}></Header>
                <View className='mine-bottom'>
                    <AtGrid data={
                        [
                            {
                                image: info,
                                value: '既往病史'
                            },
                            {
                                image: doctor,
                                value: '我的医生'
                            },
                            {
                                image: signin,
                                value: '打卡记录'
                            },
                            {
                                image: settings,
                                value: '设置'
                            }
                        ]
                    } onClick={this.selectItem}/>
                </View>
            </View>
        )
    }
}