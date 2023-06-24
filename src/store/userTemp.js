import { defineStore } from 'pinia';
import post from "@/service/axios.js";

export const useUserTemp = defineStore('userTemp', {
  state: () => {
    return {
      data: []
    }
  },
  getters: {
    all() {
      return this.data
    }
  },
  actions: {
    asyncGet(key, callback) {
      key = key.toString()
      localForage.getItem(key).then((val) => {
        _this.data[key] = val
        callback(val)
      })
    },
    get(key) {
      let _this = this
      key = key.toString()
      localForage.getItem(key).then((val) => {
        _this.data[key] = val
      })
      return this.data[_.toNumber(key)]
    },
    delete(key,succeed) {
      key = key.toString()
      this.data.splice(_.toNumber(key), 1)
      localForage.removeItem(key).then(()=>{
        if (succeed){
          succeed()
        }
      })
    },
    set(data, key, succeed) {
      key = key.toString()
      this.data[_.toNumber(key)] = data;
      localForage.setItem(key, data).then(()=>{
        if (succeed){
          succeed()
        }
      })
    },
    init(callback) {
      let _this = this
      let postData=`
      <root> 
        <UserNo>${sessionStorage.getItem("login_stuno")}</UserNo> 
        <unitno>${sessionStorage.getItem("login_unitno")}</unitno> 
        <proid>hgqxxjs</proid>
      </root>
      `
      console.log(postData);
      post("/api/InteractData/XmlGetpracticeScore.aspx", //KG0901|1|15.000000|15.00|15.00|2023/3/20 10:38:50|1^^KG0902|1|15.000000|15.00|15.00|2023/3/20 10:42:09|1^^K..
      postData,(d)=>{
        console.log(toPeopleCanRead(d),d);
      })
      localForage.length().then((l) => {
        if (l == 0) {
          callback(0)
        }
        localForage.iterate(function (v, k) {
          _this.data[_.toNumber(k)] = v;
          if (_this.data.length == l) {
            callback(1)
          }
        })
      })
    },
    alldata(succeed){
      let d=[]
      localForage.length().then((l)=> {
        if (l == 0) {
          succeed([])
        }
        console.log(l);
        localForage.iterate(function (v, k) {
          d[_.toNumber(k)] = v;
          if (d.length == l) {
            succeed(d)
          }
        })
      })
    }
  }
})

function toPeopleCanRead(data){
  let datas=data.root.RPscoreInfo
  let dataObj=[];
  _.times(10, (i)=>{
    i=i+1
    if (datas.indexOf(`DX${i==10?10:`0${i}`}`)!=-1) {
      let statr=datas.indexOf(`DX${i==10?10:`0${i}`}`)
      let end=datas.indexOf(`^`,statr)
      dataObj[i-1]=datas.substring(statr,end) //每一题的lua字符串
    }else{
      dataObj[i-1]=""
    }
  })
  return dataObj
}