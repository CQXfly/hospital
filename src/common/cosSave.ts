import Taro from '@tarojs/taro'
<<<<<<< HEAD

let COS = require('cos-wx-sdk-v5')
=======
import * as COS from 'cos-wx-sdk-v5'
>>>>>>> d9638a627fff71b7d2eefce775b1b004313302d7

var getAuthorization = function (options, callback) {
    // 格式一、（推荐）后端通过获取临时密钥给到前端，前端计算签名    
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/    
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk    
	
	Taro.request({
	method: 'GET',
	//服务端签名，参考 server 目录下的两个签名例子
        //url: 'http://demo.sts.cn/sts.php', 
    url: 'https://time-machine-firefox.cn/sts/sts', //nodeJS方式获取临时密钥
	dataType: 'json',
	success: function (result) {
		var data = result.data.data;
		var credentials = data.credentials;
            console.log("获取临时密钥", JSON.stringify(credentials));
            
			callback({
				TmpSecretId: credentials.tmpSecretId,
				TmpSecretKey: credentials.tmpSecretKey,
				XCosSecurityToken: credentials.sessionToken,
				ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
			});
		}
	});
}

let cos = new COS({
    getAuthorization: getAuthorization
})
cos.get

export const search = function search() {
    cos.getService({}, (err, data) =>{
        console.log(err)
        console.log(data)
    })
}

export const createDir = function createDir(dir) {
    // check dir
    let p = new Promise((res, rej) => {
        cos.putObject({
            Bucket: 'hospital-1253113581',
            Region: 'ap-shanghai',   /* 必须 */
            Key: `${dir}/`,              /* 必须 */
            Body: '',
         }, function(err, data) {
            if (err) {
                rej(err)
                return
            }
            res(data)
            console.log(err)
            console.log(data)
         });
    })
    return p
}

export const upload = function upload(filepath, fileName) {
    let p = new Promise((res, rej) => {
        cos.postObject({
            Bucket: 'hospital-1253113581',
            Region: 'ap-shanghai',
            Key: `lesson_photo/${fileName}`,
            FilePath: filepath,
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData))
            }
        }, (err, data)=>{
            if (err) {
                rej(err)
                return
            }
            res(data)
            console.log(err)
            console.log(data)
        })
    })
    return p
}

export const getObject = async function getObject(filepath) {
    
    let p = new Promise((res, rej) => {
        cos.getObject({
            Bucket: 'hospital-1253113581',
            Region: 'ap-shanghai',
            Key: 'lesson_photo/test.png',
        }, (err, data) => {
            if (err) {
                rej(err)
                return
            }

            res(data)
            console.log(err)
            console.log(data)
        })
    })

    return p
}


export const getObjectUrl = async function getObjectUrl(fileName) {
    
    let p = new Promise((res, rej) => {
        cos.getObjectUrl({
            Bucket: 'hospital-1253113581',
            Region: 'ap-shanghai',
            Key: 'test.png',
            Sign: false,
            Expired: 60 * 60 * 24 * 30 * 12
        }, (err, data) => {
            if (err) {
                rej(err)
                return
            }

            res(data)
            console.log(err)
            console.log(data)
        })
    })

    return p
}