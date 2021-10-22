import { View, ScrollView } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { DoctorCardView } from '../../components'
import { DoctorModel } from '../../common/NetInterface'
import { GETDoctorsList, UserManager } from "../../../src/common/Server";

interface MyProps {
}

interface MyState {
  values: DoctorModel[]
  loading: boolean
}

class Temp implements DoctorModel {
    name: string;
    age: number;
    review: boolean;
    contact: string;
    jobNumber: string;
  
    constructor(nm: string, ag: number, rev: boolean, con: string, job: string) {
      this.name = nm
      this.age = ag
      this.review = rev
      this.contact = con
      this.jobNumber = job
    }
  }


export default class Doctors extends Component<MyProps, MyState> {

    config = {
        navigationBarTitleText: '我的医生'
    }

    pageIndex: number = 1
    constructor(props: MyProps) {
        super(props)
        this.state = {
            values: [],
            loading: false
        }
    }

    componentWillMount () { 
      this.onRefreshPullDown()
    }

    onRefreshPullDown() {
        this.setState({loading: true})

        GETDoctorsList({patientId: UserManager.getInstance().getUserID()}).then(doctors => {
            this.setState({
              values: doctors,
              loading: false
            })
        })

        // Taro.showActionSheet({
        //   itemList: ['1', '2', '3', '4'],
        //   success: (index)=>{
        //     console.log(index)
        //   },
        //   fail: (e) => {
        //     console.log(e)
        //   },
        //   itemColor: '#b23',
        // })

        Taro.showLoading({
          "title": "loading",
          "mask": false,
          "success": () => {
            console.log('success')
          }
        })
    }

    cardClick(doctor: DoctorModel) {
        console.log(doctor)
    }

    render() {
        let doctors = this.state.values
        let loading = this.state.loading
        let height = Taro.getSystemInfoSync().windowHeight
        return (
            <View className='index' style={{display: 'flex'}}>
            <ScrollView 
                style={{flex: 1, height: height}}
                scrollY refresherEnabled={true} 
                refresherTriggered={loading}
                onRefresherRefresh={()=>{this.onRefreshPullDown()} }>
            {doctors.map((doctor)=>{
              return (
                <View onClick={()=>{
                  this.cardClick(doctor)
                }}>
                  <DoctorCardView name={doctor.name} jobNumber={doctor.jobNumber} contact={doctor.contact} review={true}/>
                </View>
              )
            })}
          </ScrollView>
        </View>
        )
    }
}