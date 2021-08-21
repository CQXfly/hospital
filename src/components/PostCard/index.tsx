import Taro from '@tarojs/taro'
import {View, Form, Input, Textarea, Picker } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'

import './index.scss'
import { Component } from '@tarojs/taro'
import { DiseaseUpdateInfo, DiseaseUpdatePhotos } from '../../../src/common/NetInterface'
import { DiseaseUploadInfo, DiseaseUploadPhotos, UserManager } from '../../../src/common/Server'
import { UploadDiseasePhoto } from '../../../src/common/cosSave'
let departs = require('../../static/departs')
interface MyProps {
    handleSubmit: () => void
    // handleNameInput: () => void

    name: string
    hospital: string
    info: string
}
class ImgFile {
    url: string
    constructor(url: string) {
        this.url = url
    }
}

interface MyState {
    firstColum: string[],
    secondColumn: string[],
    source: string[][],
    type: string,
    depart: string,
    files: ImgFile[],
    info: string
    stage: string
}
export default class PostCard extends Component<MyProps, MyState> {

    info: string = ""
    stage: string = ""
    type: string = ""

    constructor(props: MyProps) {
        super(props)
        let a = departs.dataList as Array<{string: Array<string>}>
        var leftColum: string[] = []
        // var rightColum: string[][] = []
        var fir: string[] = []
        var sour: string[][] = []
        var index = 0
        a.map((res)=>{
            // console.log('res: ',res)
            var temp: string[] = []
            for(let k in res) {
                leftColum.push(k)
                let arr = res[k] as Array<{}>
                
                arr.map((sub)=>{
                    temp.push(sub['name'] as string)
                })
                if (fir.length == 0) {
                    fir = temp
                }
                // console.log('fir: ',temp)
                
                // rightColum.push(res[k])
            }
            console.log('insert: ', temp, index)
            sour.push(temp)
            index += 1
        })
        console.log('res: ',sour, a.length, sour.length)
        this.state = {
            // multiIndex: [0,0],
            // multiArray: [leftColum, fir],
            firstColum: leftColum,
            secondColumn: fir,
            source: sour,
            type: '',
            depart: '',
            files: [],
            info: '',
            stage: '',
        }
    }

    handleSubmit() {

        let info: DiseaseUpdateInfo = {
            type: this.type,
            patientId: UserManager.getInstance().getUserID(),
            info: this.info,
            stage: this.stage
        }

        DiseaseUploadInfo(info).then(res =>{
            let diseaseId = res.diseaseId
            
            if (this.state.files.length > 0) {
                let promises = this.state.files.map(file => {
                    return this.uploadPhotoWithCos(file.url, UserManager.getInstance().getWxId())
                })
    
                Promise.all(promises).then(res => {
                    DiseaseUploadPhotos({photos: res, diseaseId})
                })
            }
        })
        
        this.props.handleSubmit()
    }

    async uploadPhotoWithCos(file, patientiId) {
        let fileName = `disease_${new Date().getTime()}`
        UploadDiseasePhoto(patientiId, file, fileName)
        return `https://hospital-1253113581.cos.ap-shanghai.myqcloud.com/disease_photo/${patientiId}/${fileName}`
    }

    handleNameInput(val) {
        this.type = val.detail.value
    }

    handleHospitalInput(val) {
        this.stage = val.detail.value
    }

    handleInfoInput(val) {
        this.info = val.detail.value
    }

    onChange(e) {
        let indexes = e.detail.value as number[]
        let type = this.state.firstColum[indexes[0]]
        let depart = this.state.secondColumn[indexes[1]]
        // console.log('current: ', type, depart)
        this.setState({
            type: type,
            depart: depart
        })
    }

    onColumnChange(e) {
        let column = e.detail.column
        if (column == 1) {
            return
        }
        let row = e.detail.value
        // let key = this.state.multiArray[0][row]
        let sec = this.state.source[row]
        // console.log('current: ', sec)
        this.setState({
            secondColumn: sec
        })
        
    }

    onImageChange(files) {
        this.setState({
            files
        })
    }

    render() {
        return (
            <View className='post-form'>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <View className='form-hint'>疾病名称</View>
                <Input 
                  className='input-title'
                  type='text'
                  placeholder='点击输入名称'
                  value={this.props.name}
                  onInput={this.handleNameInput.bind(this)}
                />
                <View className='form-hint'>病理阶段</View>
                <Input
                  placeholder='点击输入病理阶段'
                  className='input-title'
                  value={this.props.hospital}
                  onInput={this.handleHospitalInput.bind(this)}
                />
                <View className='form-hint'>科室</View>
                <Picker
                 mode='multiSelector' 
                 value={this.state.firstColum} 
                 range={[this.state.firstColum, this.state.secondColumn]} 
                 onChange={this.onChange.bind(this)} 
                 onColumnChange={this.onColumnChange.bind(this)}>
                    <View className='picker-bg'>{this.state.type.length > 0 ? this.state.type + ' ' + this.state.depart : '请选择科室'}</View>
                </Picker>
                <View className='form-hint'>描述</View>
                <Textarea
                  placeholder='点击输入正文'
                  className='input-content'
                  value={this.props.info}
                  onInput={this.handleInfoInput.bind(this)}
                />
                <View className='form-hint'>选择图片</View>
                <AtImagePicker 
                files={this.state.files} 
                onChange={this.onImageChange.bind(this)}/>
                <AtButton formType='submit' type='primary' >提交</AtButton>
            </Form>
            
        </View>
        )
    }
}



// dep: string;
//   type: string;
//   name: string;
//   info: string;
//   hosptital: string;
//   date: string;