import { View } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { AtForm, AtInput, AtCheckbox, AtButton } from "taro-ui";

import './register.scss'


export default class Register extends Component {
    config = {
        navigationBarTitleText: '注册'
    }
    state = {
        name: '',
        age: '',
        gender: 'male',
        phone: ''
    }
    checkBoxOption = [
        { value: 'male', label: '男'},
        { value: 'female', label: '女'}
    ]
    constructor () {
        super(...arguments)
    }

    handleChange(value) {
        this.setState({
            value
        })
    }

    handleGender(value: Array<string>) {
        let index = value.lastIndexOf(this.state.gender)
        if ( index < 0) {
            return
        }
        let gen = this.state.gender
        var res = 'female'
        if (gen == 'female') {
            res = 'male'
        }
        console.log(value)
        this.setState({
            gender: res
        })
    }

    onSubmit(event) {
        Taro.switchTab({
            url:'/pages/index/index'
        })
    }

    onReset(event) {
        this.setState({
            name: '',
            age: '',
            gender: 'male',
            phone: ''
        })
        console.log(this.state)
    }

    render() {
        return (
            <View className='bg'>
                <AtForm
                onSubmit={this.onSubmit.bind(this)}
                onReset={this.onReset.bind(this)}>
                <AtInput
                    required
                    name='name' 
                    title='姓名' 
                    type='text' 
                    placeholder='请输入您的姓名' 
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, 'name')}/>
                <AtInput
                    required
                    name='age' 
                    title='年龄' 
                    type='number' 
                    placeholder='请输入您的年龄' 
                    value={this.state.age}
                    onChange={this.handleChange.bind(this, 'age')}/>
                <AtCheckbox className='check-box-back' options={this.checkBoxOption} selectedList={[this.state.gender]} onChange={this.handleGender.bind(this)}/> 
                <AtInput
                    name='phone' 
                    title='联系方式' 
                    type='phone' 
                    placeholder='请输入您的联系方式' 
                    value={this.state.phone}
                    onChange={this.handleChange.bind(this, 'phone')}/>
                <AtButton formType='submit'>提交</AtButton>
                <AtButton formType='reset'>重置</AtButton>
                </AtForm>
            </View>
        )
    }
}
