import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Header } from '../../components'
import { AtGrid } from "taro-ui"

import {UserPatientModel} from '../../common/NetInterface'
import './index.scss'

import info from '../../images/profile/profile_info.png'
import doctor from '../../images/profile/profile_doctor.png'
import signin from '../../images/profile/profile_signin.png'
import settings from '../../images/profile/profile_settings.png'

interface MyProps {
}

interface MyState {
    value: UserPatientModel
    avatar: string
}
export default class Mine extends Component<MyProps, MyState> {
    config = {
        navigationBarTitleText: '我的'
    }
    constructor(props: MyProps) {
        super(props)
    }
    selectItem(obj, index) {
        var page = ''
        switch (index) {
            case 0:
                page = '/pages/diseaseHistory/diseaseHistory'
                break
            case 1:
                page = '/pages/doctors/doctors'
                break
            case 2:
                page = '/pages/signin/signin'
                break
            case 3:
                page = '/pages/settings/settings'
                break
        }
        Taro.navigateTo({
            url: page
        })
        console.log(index, obj)
    }
    render() {
        console.log(this.state.avatar)
        return (
            <View className='mine-back'>
                <Header avatar={''} name={"test"} age={40}></Header>
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