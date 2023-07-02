import { toXmlDom, OBJtoXML, convertToJSON } from "@/assets/lib/xmlDo.ts";
export interface callback{
  root:any
}
export default function post(url:string, data:object|string, callback:Function) {
  if (localStorage.serverType != "tiny") {
    if (typeof data != "string") {
      data = OBJtoXML(data);
    }
    if (import.meta.env.DEV) {
      fetch(url, {
        method: "post",
        body: data as string,
      })
        .then((d:Response) => d.text())
        .then((d:string) => {
          callback(JSON.parse(convertToJSON(toXmlDom(d))) as callback, d);
        });
    } else {
      $.post(
        `${localStorage.server}${url.substr(4)}`,
        JSON.stringify(data),
        function (backData) {
          callback(JSON.parse(convertToJSON(backData)) as callback, backData);
        }
      );
    }
  } else {
    if (import.meta.env.DEV) {
      fetch(`http://tinywebdb.appinventor.space/api?user=${localStorage.serverUser}&secret=${localStorage.serverPwd}`, {
        method: "post",
        body: data as string,
      })
        .then((d:Response) => d.text())
        .then((d:string) => {
          callback(JSON.parse(d) as callback, d);
        });
    } else {
      $.post(
        `${localStorage.server}${url.substr(4)}`,
        JSON.stringify(data),
        function (backData:string) {
          callback(JSON.parse(backData) as callback, backData);
        }
      );
    }
  }
}
