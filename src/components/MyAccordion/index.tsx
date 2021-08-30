// import { View } from "@tarojs/components";
import { View, Image, Text } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { AtAccordion, AtList, AtListItem, AtIcon} from "taro-ui";

// 
import { Disease } from "../../common/DiseaseInterfaces";
import './index.scss'


// interface MyProps {
// }

// interface MyState {
//   value: Disease
//   open: boolean
// }
export default class MyAccordion extends Component<Disease> {
    state = {
        // name: '',
        // date: Date(),
        // info: '',
        // type: '',
        // hosp: '',
        // dep: '',
        open: false
    }

    handleClick(value: boolean) {
        this.setState({open: value})
    }

    previewImage(e) {
        let current = e.target.dataset.url
        console.log('previewimage', current)
        Taro.previewImage({
            current: current,
            urls: this.props.photos
        })
    }

    render() {
        // console.log('let me see', this.props.photos)
        return (
            <AtAccordion 
            open={this.state.open} 
            onClick={this.handleClick.bind(this)}
            title={this.props.name}
            note={this.props.date} >
              <AtList hasBorder={false}>
                {/* <AtListItem title={this.props.dep} extraText={this.props.hosptital} note={this.props.type}/>
                <AtListItem note={this.props.info}/> */}
                <View className='subInfoBack'>
                    <Text className='subInfo'>{this.props.hosptital}</Text>
                    <Text className='subInfo'>{this.props.type}</Text>
                </View>
                <View className='description'>{this.props.info}</View>
                <View className='photoArea'>{this.props.photos.map((photo) => {
                    return (
                    <Image className='icon' src={photo} mode={"aspectFill"} onClick={this.previewImage}/>)
                })}
                </View>
              </AtList>
            </AtAccordion>
        )
    }
}

