//axios的默认配置
import { JSEncrypt } from 'jsencrypt'
import axios from 'axios'
import { Message } from 'element-ui';  //element库的消息提示，可以不用

function getRandom() {//随机数方法
    let num = ""
    for (let i = 0; i < 7; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}
const stamp = (new Date()).getTime();
const random = getRandom();
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8MuPt644LogqjOkP/rj05BEozYdBdBo+aiJUx/lqh/gx+L7ln93P+90cGEjk2P8NHytnxSzeSIykabkCpbokTy7frqyOkarOVOeivsY06n9M5Fpkm0AuEp5e3q0aJS3vCAi5Z8ypdPy1Iic/FepUEkEHqO4zp8M8m8p/m1mkwRQIDAQAB'
const encryptor = new JSEncrypt()  // 新建JSEncrypt对象
encryptor.setPublicKey(publicKey)  // 设置公钥 encryptor.encrypt(XXXXXXXXX)
//创建axios实例
var service = axios.create({
    // baseURL: 'http://47.94.172.208:20191/api',
	baseURL: 'http://47.111.184.219:88/api',
    timeout: 50000,
    headers: {
        'content-type': 'application/json',
        'stamp': stamp,
        'random': random,
        "token": encryptor.encrypt(stamp + random),
        'auth': localStorage.getItem("dataToken")?localStorage.getItem("dataToken"):'' // 登录接口的返回值
    }
})
export default {
    baseUrlApi:'http://47.111.184.219:88/api',
    baseUrl:'http://47.111.184.219:88',
    //get请求，其他类型请求复制粘贴，修改method
    get(url, param) {
        return new Promise((cback, reject) => {
            service({
                method: 'get',
                url: url,
                params: param,
            }).then(res => {
                //axios返回的是一个promise对象 
                var res_code = res.status.toString();
                if (res_code.charAt(0) == 2) {
                    cback(res);   //cback在promise执行器内部
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log('请求错误')
                    //Message是element库的组件，可以去掉
                    Message({
                        showClose: true,
                        message: '请求错误',
                        type: 'error'
                    });
                } else {
                    reject(err.response);
                    console.log(err.response, '异常2')
                }
            })

        })
    },

    post(url, param) {
        return new Promise((cback, reject) => {
            service({
                method: 'post',
                url: url,
                data: param,
            }).then(res => {
                var res_code = res.status.toString();
                if (res_code.charAt(0) == 2) {
                    cback(res);
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log('请求错误')
                } else {
                    reject(err.response);
                    console.log(err.response, '异常2')
                }
            })
    
        })
    },
} 