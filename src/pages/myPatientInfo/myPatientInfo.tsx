import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { PatientInfoResponse } from '../../common/NetInterface'
import { MyAccordion } from '../../components'
import { DiseaseHistoyrList } from '../../common/Server'
import { Disease, DiseaseModel } from '../../common/DiseaseInterfaces'
import { AtDivider } from 'taro-ui'
import './myPatientInfo.scss'

interface MyProps {

}

interface MyState {
    name: string
    age: number 
    address: string
    contact: string
    gender: boolean
    id: string
    values: Disease[]
    opens: boolean[]
}

export default class MyPatientInfo extends Component<MyProps, MyState> {

    config = {
        navigationBarTitleText: '患者信息'
    }
    constructor(props) {
        super(props)
        this.state = {
            name: 'test',
            age: 0, 
            address: '',
            contact: '',
            gender: true,
            id: '',
            values: [],
            opens: []
        }
    }

    componentWillMount() {
        let model = this.$router.params.model
        let dic = JSON.parse(model) as PatientInfoResponse
        let ops = this.state.opens
        console.log('let me see', dic)
        DiseaseHistoyrList({patientId: dic.id}).then(res => {
            ops.push(false)
            let vals = res.map(ele => {
                return new DiseaseModel("undefined", ele.type, "疾病名称", ele.info, ele.stage, '2020/01/01', ele.photos) 
            })
            this.setState({
                name: dic.name,
                age: dic.age,
                address: dic.address || "undefined",
                contact: dic.contact || "undefined",
                gender: dic.gender,
                id: dic.id,
                values: vals,
                opens: ops
            })
        })
    }

    goToSignIn() {
        let page = `/pages/signin/signin?id=${this.state.id}`
        Taro.navigateTo({
            url: page
        })
    }

    render () {
        return (
            <View>
                <View className='info-part'>
                    <Text className='info'>姓名：{this.state.name}</Text>
                    <Text className='info'>年龄：{this.state.age}</Text>
                    <Text className='info'>联系方式：{this.state.contact}</Text>
                    <Text className='goToRecord' onClick={this.goToSignIn.bind(this)}>{"打卡记录 >"}</Text>
                </View>
                <AtDivider content='既往病史' />
                <View>
                    {this.state.values.map((dis)=>{
                        return (
                        <View>
                            <MyAccordion name={dis.name} type={dis.type} date={dis.date} dep={dis.dep} hosptital={dis.hosptital} info={dis.info} photos={dis.photos}/>
                        </View>   
                    )})}
                </View>
            </View>
        )
    }
}