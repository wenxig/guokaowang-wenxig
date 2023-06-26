import { toXmlDom, OBJtoXML, convertToJSON } from "@/assets/lib/xmlDo.js";

export default function post(url, data, callback) {
  if (localStorage.serverType != "tiny") {
    if (typeof data != "string") {
      data = OBJtoXML(data);
    }
    if (import.meta.env.DEV) {
      fetch(url, {
        method: "post",
        body: data,
      })
        .then((d) => d.text())
        .then((d) => {
          callback(JSON.parse(convertToJSON(toXmlDom(d))), d);
        });
    } else {
      $.post(
        `${localStorage.server}${url.substr(4)}`,
        JSON.stringify(data),
        function (backData) {
          callback(JSON.parse(convertToJSON(backData)), backData);
        }
      );
    }
  } else {
    if (import.meta.env.DEV) {
      fetch(`http://tinywebdb.appinventor.space/api?user=${localStorage.serverUser}&secret=${localStorage.serverPwd}`, {
        method: "post",
        body: data,
      })
        .then((d) => d.text())
        .then((d) => {
          callback(JSON.parse(d), d);
        });
    } else {
      $.post(
        `${localStorage.server}${url.substr(4)}`,
        JSON.stringify(data),
        function (backData) {
          callback(JSON.parse(backData), backData);
        }
      );
    }
  }
}
