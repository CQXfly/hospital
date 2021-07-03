import { Component } from "@tarojs/taro";
import { AtCalendar } from "taro-ui"

import 'taro-ui/dist/style/components/calendar.scss'

export default class Signin extends Component {
    config = {
        navigationBarTitleText: '打卡记录'
    }
    render() {
        return (
            <AtCalendar marks={
                [
                    { value: '2021/07/02' },
                    { value: '2021/07/01' },
                    { value: '2021/06/30' },
                    { value: '2021/06/29' },
                    { value: '2021/06/28' }]}/>
        )
    }
}