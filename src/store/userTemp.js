import { defineStore } from 'pinia';

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
    delete(key) {
      key = key.toString()
      this.data.splice(_.toNumber(key), 1)
      localForage.removeItem(key)
    },
    set(data, key, sussful) {
      key = key.toString()
      this.data[_.toNumber(key)] = data;
      localForage.setItem(key, data).then(()=>{
        if (sussful){
          sussful()
        }
      })
    },
    init(callback) {
      let _this = this
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
    }
  }
})