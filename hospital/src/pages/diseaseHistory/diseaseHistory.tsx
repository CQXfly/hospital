import { View, ScrollView } from "@tarojs/components";
// import { CommonEvent } from "@tarojs/components/types/common";
import { Component } from "@tarojs/taro";
// import { AtAccordion, AtList, AtListItem } from "taro-ui";
import { MyAccordion } from "../../components";

// import 'taro-ui/dist/style/components/accordion.scss'
import { Disease } from "../../common/DiseaseInterfaces";

// interface MyProps {
//     dis: string
//     open: string
// }
interface MyProps {
}

interface MyState {
  values: Disease[]
  opens: boolean[]
}

class Temp implements Disease {
  dep: string;
  type: string;
  name: string;
  info: string;
  hosptital: string;
  date: string;

  constructor(dp: string, type: string, name: string, info: string, hosp: string, date: string) {
    this.dep = dp
    this.type = type
    this.name = name
    this.info = info
    this.hosptital = hosp
    this.date = date
  }
  
}

// var deps = require("../../static/departs.tsx")
export default class DiseaseHistory extends Component<MyProps, MyState> {
    config = {
        navigationBarTitleText: '既往病史'
    }
    constructor(props: MyProps) {
        super(props)

        this.state = {
            values: [],
            opens: []
        }
    }
    componentWillMount () { 
        // for i in 0..
        this.requestData()
    }

    requestData() {
      let vals = this.state.values
      var ops = this.state.opens
      for (let index = 0; index < 5; index++) {
        let name = "疾病名称"
        let dep = "外科"
        let type = "消化外科"
        let date = '2020/01/01'
        let hos = "上海协和医院"
        let info = "疾病描述啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦"
        let val = new Temp(dep, type, name, info, hos, date)
        vals.push(val)
        ops.push(false)
      }
      this.setState({values: vals, opens: ops})
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

    render () {
        // let height = Taro.getSystemInfoSync().windowHeight
        console.log(this.state.values)
        return (
          
          this.state.values.map((dis)=>{
            return (
              <MyAccordion
               name={dis.name} 
               type={dis.type} 
               date={dis.date} 
               dep={dis.dep} 
               hosptital={dis.hosptital} 
               info={dis.info} />
          )
        })
      )
    }
}