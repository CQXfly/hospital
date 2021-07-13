import { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { GetLessonListRequest } from '../../common/Server'
import { LessonModel} from '../../common/HomeInterfaces'

import { HomeCardView } from '../../components'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

interface MyProps {
}

interface MyState {
  values: LessonModel[]
  loading: boolean
}

export default class Index extends Component<MyProps, MyState> {
  config = {
    navigationBarTitleText: '首页'
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

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  submit() {
    console.log('12344')
  }
  handleChange(){
    console.log('xxx')
  }
  onSubmit() {
    console.log('www')
  }
  onReset() {
    console.log('vvv')
  }

  onRefreshPullDown() {
    this.setState({loading: true})
    
    GetLessonListRequest({page: 1}).then(res=>{
      console.log(res)
      this.pageIndex = 2
      this.setState({values: res, loading: false})
    })
  }

  onRefreshPullUp() {
    this.setState({loading: true})
    console.log(this.pageIndex)
    GetLessonListRequest({page: this.pageIndex}).then(res=>{
      console.log(res)
      this.pageIndex += 1
      let r =  this.state.values
      res.forEach(e=>{
        r.push(e)
      })
      this.setState({values: r, loading: false})
    })
  }

  cardClick(lesson: LessonModel) {
    console.log("what's card")
    Taro.navigateTo({
      url: `/pages/detail/lessonDetail?title=${lesson.title}&info=${lesson.info}&imageurl=${lesson.imageUrl}&videourl=${lesson.videoUrl}`
    })
  }

  render () {
    let cards = this.state.values
    let loading = this.state.loading
    let height = Taro.getSystemInfoSync().windowHeight
    let that = this
      return (
        <View className='index' style={{display: 'flex'}}>
          <ScrollView 
          style={{flex: 1, height: height}}
          scrollY refresherEnabled={true} 
          refresherTriggered={loading}
           onRefresherRefresh={()=>{this.onRefreshPullDown()} }
           onScrollToLower={()=> {this.onRefreshPullUp()}}>
            {cards.map((card)=>{
              return (
                <View onClick={()=>{
                  that.cardClick(card)
                }}>
                  <HomeCardView title={card.title} image={card.imageUrl} update={card.updatedAt} />
                </View>
              )
            })}
          </ScrollView>
        </View>
      )
    
  }
}






