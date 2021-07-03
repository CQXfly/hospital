import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
// import { AtAvatar } from 'taro-ui'

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
    
    render () {
        return (
            <View className='back'>
                <View className='left-part'>
                    <Image className='avatar' src={this.props.avatar}></Image>
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

// export default function Header(props) {
//     const nickName = useSelector(state => state.user.nickName)
//     const avatar = useSelector(state => state.user.avatar)
//     const age = useSelector(state => state.user.age)

//     function onImageClick() {
//         Taro.previewImage({
//             urls: [avatar]
//         })
//     }

    // return (
    //     <View className='back'>
    //         <View className='left-part'>
    //             <AtAvatar className='avatar' circle image={avatar}></AtAvatar>
    //             <View className='simple-info'>
    //                 <Text className='name'>{nickName}</Text>
    //                 <Text className='age'>{age}</Text>
    //             </View>
    //         </View>
    //         <View className='right-part'>
    //             <Text className='edit'>编辑信息</Text>
    //             <Image className='arrow' src={arrow}></Image>
    //         </View>
    //     </View>
    // )
// }