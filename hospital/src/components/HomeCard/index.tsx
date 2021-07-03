import { View, Text, Image } from '@tarojs/components'
import { Component } from 'react'
import { CardProps } from 'src/common/HomeInterfaces'


export default class HomeCardView extends Component<CardProps> {
  
    render () {
      const dot = " . "
      return (
        <View>
        <View style={{
          paddingTop: 10,
          paddingBottom: 10,
          
          display: "flex", 
          flexDirection: "row", 
          flexWrap: "wrap", 
          alignContent: "space-between", 
          backgroundColor: "white",
        }}>
          <View style={{
            marginLeft: 16,
            backgroundColor: "white", 
            flex: 1, 
            display: "flex",
             alignContent: "space-around", 
             flexDirection: "column"
             }}>
            <Text style={{fontSize: 30, color: "black"}}>
             {this.props.title}
            </Text>
            <View style={{flex: 1}}>
            </View>
            <View style={{
              display: "flex"
              }}>
              <Text style={{fontSize: 12, color: 'darkgray'}}> {this.props.update} </Text>
              <Text style={{fontSize: 12, color: 'darkgray'}}>  {dot} </Text>
              <Text style={{fontSize: 12, color: 'darkgray'}}> 100w 收藏 </Text>
            </View>
          </View>
  
          <View></View>
  
          <View style={{ width: 100, height: 80, marginRight: 16, borderRadius: '4%'}}>
          <Image
            style={{width: 100, height: 80, borderRadius: '4%'}}
            mode='center'
            src={this.props.image}
          />
          </View>
        </View>
        <View style={{height: 1, backgroundColor: "gray"}} ></View>
        </View>
      )
    }
  }