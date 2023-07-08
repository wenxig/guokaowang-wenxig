import { toXmlDom, OBJtoXML, convertToJSON } from "@/assets/lib/xmlDo.ts";
import { http } from "@tauri-apps/api";
export interface callback {
  root: any
}
export default function post(url: string, data: object | string, callback: (data: callback,str?:string)=>void) {
  if (localStorage.serverType != "tiny") {
    url = url.substring(4)
    url = 'http://121.22.72.189:8081/hgqlx'+url
    if (typeof data != "string") {
      data = OBJtoXML(data);
    }
    http.fetch(url, {
      headers:{
        'Content-Type':'text/xml'
      },
      method: "POST",
      body: http.Body.text(data.toString()),
      responseType:2
    }).then((d) => d.data).then(d => {
      callback(JSON.parse(convertToJSON(toXmlDom(d as string))) as callback, d as string)
    })
  } else {
    let url = `http://tinywebdb.appinventor.space/api?user=${localStorage.serverUser}&secret=${localStorage.serverPwd}`
    http.fetch(url, {
      method: "POST",
      body: http.Body.json(data as object)
    }).then((d) => d.data).then(d => callback(JSON.parse(d as string)))
  }
}
