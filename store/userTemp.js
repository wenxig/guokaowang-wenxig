import { defineStore } from "pinia";
import post from "@/service/axios.js";
import { luaToChoose } from "@/assets/lib/xmlDo.js";

export const useUserTemp = defineStore("userTemp", {
  state: () => {
    return {
      data: [],
    };
  },
  getters: {
    all() {
      return this.data;
    },
  },
  actions: {
    asyncGet(key, callback) {
      key = key.toString();
      localForage.getItem(key).then((val) => {
        _this.data[key] = val;
        callback(val);
      });
    },
    get(key) {
      let _this = this;
      key = key.toString();
      localForage.getItem(key).then((val) => {
        _this.data[key] = val;
      });
      return this.data[_.toNumber(key)];
    },
    delete(key, succeed) {
      key = key.toString();
      this.data.splice(_.toNumber(key), 1);
      localForage.removeItem(key).then(() => {
        if (succeed) {
          succeed();
        }
      });
    },
    set(data, key, succeed) {
      key = key.toString();
      this.data[_.toNumber(key)] = data;
      localForage.setItem(key, data).then(() => {
        if (succeed) {
          succeed();
        }
      });
    },
    init(callback) {
      let _this = this;
      let postData = {
        root: {
          UserNo: sessionStorage.getItem("login_stuno"),
          unitno: sessionStorage.getItem("login_unitno"),
          proid: "hgqxxjs",
        },
      };
      post(
        "/api/InteractData/XmlGetpracticeScore.aspx", //KG0901|1|15.000000|15.00|15.00|2023/3/20 10:38:50|1^^KG0902|1|15.000000|15.00|15.00|2023/3/20 10:42:09|1^^K..
        postData,
        (d) => {
          d=luaToChoose(d)
          _.each(d, (da,i)=>{
            localForage.setItem(_.toString(i),da);
            _this.data[i] = da;
          })
          callback(1)
        }
      );
    },
    alldata(succeed) {
      let d = [];
      localForage.length().then((l) => {
        if (l == 0) {
          succeed([]);
        }
        localForage.iterate(function (v, k) {
          d[_.toNumber(k)] = v;
          if (d.length == l) {
            succeed(d);
          }
        });
      });
    },
  },
});


