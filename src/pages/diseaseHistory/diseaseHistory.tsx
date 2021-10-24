import { View, Text } from "@tarojs/components";
// import { CommonEvent } from "@tarojs/components/types/common";
import { Component } from "@tarojs/taro";
import { AtFloatLayout, AtFab} from "taro-ui";
import { MyAccordion, PostCard } from "../../components";

import './diseaseHistory.scss'
// import 'taro-ui/dist/style/components/accordion.scss'
import { Disease, DiseaseModel } from "../../common/DiseaseInterfaces";
import { DiseaseHistoyrList, UserManager } from "../../../src/common/Server";

// interface MyProps {
//     dis: string
//     open: string
// }
interface MyProps {
}

interface MyState {
  values: Disease[]
  opens: boolean[]
  isEdit: boolean
  editDis?: Disease
}

export default class DiseaseHistory extends Component<MyProps, MyState> {
    config = {
        navigationBarTitleText: '既往病史'
    }
    
    constructor(props: MyProps) {
        super(props)
        this.state = {
            values: [],
            opens: [],
            isEdit: false,
            editDis: undefined
        }
    }
    
    
    componentWillMount () { 
        // for i in 0..
        this.requestData()
    }

    requestData() {

      let ops = this.state.opens
      DiseaseHistoyrList({patientId: UserManager.getInstance().getUserID()}).then(res => {
        let vals = res.map(ele => {
          ops.push(false)
          console.log('response', ele)
          return new DiseaseModel("undefined", ele.type, "疾病名称", ele.info, ele.stage, '2020/01/01', ele.photos) 
          // return new Temp()
        })
        this.setState({
          values: vals, 
          opens: ops
        })

      })
    }

    // handleClick(index: number) {
    //   let list = this.state.opens
    //   let ori = list[index]
    //   console.log(index, ori)
    //   list[index] = !ori
    //   this.setState({
    //     opens: list
    //   })
    // }
    // handleClick(open: boolean, event: CommonEvent) {
    //   let list = this.state.opens
    //   event.target.
    //   console.log(index, ori)
    //   list[index] = open
    //   this.setState({
    //     opens: list
    //   })
    // }
    setIsEdit(isedit) {
      // console.log(isedit)
      this.setState({
        isEdit: isedit
      })
    }

    render () {
        // let height = Taro.getSystemInfoSync().windowHeight
        // console.log('response:', this.state.values)
        return (
        <View>
          {this.state.values.map((dis)=>{
            return (
              <View>
                <MyAccordion 
                  name={dis.name} 
                  type={dis.type} 
                  date={dis.date} 
                  dep={dis.dep} 
                  hosptital={dis.hosptital} 
                  info={dis.info} 
                  photos={dis.photos}/>
              </View>   
          )})}
            <AtFloatLayout isOpened={this.state.isEdit} title='添加' onClose={() => this.setIsEdit(false)}>
                  <PostCard name='' hospital='' info='' handleSubmit={() => this.setIsEdit(false)}/>
                </AtFloatLayout>
                <View className='post-button'>
                  <AtFab onClick={() => this.setIsEdit(true)}>
                    <Text className='at-fab__icon at-icon at-icon-edit'></Text>
                  </AtFab>
                </View>
          </View>
      )
    }
}

