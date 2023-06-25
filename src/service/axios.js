import { toXmlDom, OBJtoXML, convertToJSON } from "@/assets/lib/xmlDo.js";
export default function post(url, data, callback) {
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
      `http://121.22.72.189:8081/hgqlx${url.substr(4)}`,
      data,
      function (backData) {
        callback(JSON.parse(convertToJSON(backData)), backData);
      }
    );
  }
}
