import { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { PatientInfoResponse, UserDoctorModel } from '../../common/NetInterface'
import {PatientList} from '../../common/Server'
import { PatientCardView } from '../../components'

interface MyProps {
}

interface MyState {
  values: PatientInfoResponse[]
  loading: boolean
}
let Keys = require('../../static/consts')
// class Temp implements PatientModel {
//   gender: boolean
//   name: string
//   contact: string
//   address: string
//   age: number
//   avatar: string

//   constructor(name: string, age: number, gender: boolean, con: string, add: string, ava: string) {
//     this.name = name
//     this.age = age
//     this.gender = gender
//     this.contact = con
//     this.address = add
//     this.avatar = ava
//   }
// }

export default class DoctorHome extends Component<MyProps, MyState> {
    config = {
        navigationBarTitleText: '首页'
    }

    pageIndex: number = 1
    doctorId: string = ""
    constructor(props: MyProps) {
        super(props)
        this.state = {
            values: [],
            loading: false
        }
    }

    onRefreshPullDown() {
        this.setState({loading: true})
    }

    componentDidShow() {
      Taro.getStorage({
          key: Keys.storageKeys.patient,
          success: res => {
              let mo = res.data as unknown as UserDoctorModel
              console.log(mo)
              this.doctorId = mo.id
              this.fetchPatients()
          }
      })
  }

  fetchPatients() {
    PatientList({doctorId: this.doctorId}).then(patients => {
      console.log(patients)
      this.setState({
        values: patients
      })
    })
  }

    cardClick(patient: PatientInfoResponse) {
      
      let js = JSON.stringify(patient)
      console.log(js)
      Taro.navigateTo({
        url: `/pages/myPatientInfo/myPatientInfo?model=${js}`
      })
  }

    render() {
        let patients = this.state.values
        let loading = this.state.loading
        let height = Taro.getSystemInfoSync().windowHeight
        return (
            <View className='index' style={{display: 'flex'}}>
            <ScrollView 
                style={{flex: 1, height: height}}
                scrollY refresherEnabled={true} 
                refresherTriggered={loading}
                onRefresherRefresh={()=>{this.onRefreshPullDown()} }>
            {patients.map((patient)=>{
              return (
                <View onClick={()=>{
                  this.cardClick(patient)
                }}>
                  <PatientCardView name={patient.name} age={patient.age} contact={patient.contact} gender={patient.gender} address={patient.address}/>
                </View>
              )
            })}
          </ScrollView>
        </View>
        )
    }
}