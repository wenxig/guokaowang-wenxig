import { defineStore } from "pinia";
import post from "@/service/axios.ts";
import { luaToChoose } from "@/assets/lib/xmlDo.ts";
import localforage from "localforage";
export interface Data {
  data: userData[];
  all: userData[]
}
export interface userData {
  all: number[];
  height: number;
  name: string;
  times: number;
}
export const useUserTemp = defineStore("userTemp", {
  state: () => {
    return {
      data: new Array<any>(),
    };
  },
  getters: {
    all() {
      return this.data;
    },
  },
  actions: {
    asyncGet(key: number | string, callback: (data:userData[])=>void): void {
      let _this: Data = this;
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
        (d: any) => {
          d = luaToChoose(d);
          _.each(d, (da, i: number) => {
            localforage.setItem(_.toString(i), da);
            _this.data[i] = da;
          });
          if (key=='all') {
            callback(
              _this.data
            );
          }else{
            callback(
              _this.data[key]
            );
          }
        }
      );
    },
    get(key: number | string): userData {
      let _this = this;
      key = key.toString();
      localforage.getItem(key).then((val) => {
        _this.data[key] = val;
      });
      return this.data[_.toNumber(key)] as userData;
    },
    delete(key: number | string, succeed: ()=>void): void {
      key = key.toString();
      this.data.splice(_.toNumber(key), 1);
      localforage.removeItem(key).then(() => {
        if (succeed) {
          succeed();
        }
      });
    },
    set(data: any, key: number | string, succeed?: ()=>void): void {
      key = key.toString();
      this.data[_.toNumber(key)] = data;
      localforage.setItem(key, data).then(() => {
        if (succeed) {
          succeed();
        }
      });
    },
    init(callback?: ()=>void): void {
      try{
        let _this: Data = this;
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
          (d: any) => {
            d = luaToChoose(d);
            _.each(d, (da, i: number) => {
              localforage.setItem(_.toString(i), da);
              _this.data[i] = da;
            });
            (callback as Function)();
          }
        );
      }catch(err){
        alert(err)
      }
    },
    alldata(succeed: (data: any)=>void):void {
      let d: any[] = [];
      localforage.length().then((l) => {
        if (l == 0) {
          succeed([]);
        }
        localforage.iterate(function (v, k) {
          d[_.toNumber(k)] = v;
          if (d.length == l) {
            succeed(d);
          }
        });
      });
    },
  },
});
