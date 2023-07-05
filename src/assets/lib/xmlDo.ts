"use strict";
import allChooses from "@/assets/json/choose.json";

function toXmlDom(source: string):Document {
  let xmlDoc: Document|null = null;
  let parser:DOMParser = new DOMParser();
  xmlDoc = parser.parseFromString(source, "text/xml");
  return xmlDoc;
}
function convertToJSON(xmlDoc: Document):string {
  let jsonStr:string = "";
  let buffer:string[] = new Array();

  buffer.push("{");
  let nodeList:NodeListOf<ChildNode> = xmlDoc.childNodes;
  generate(nodeList);
  function generate(node_list: string | any[] | NodeListOf<ChildNode>) {
    for (let i = 0; i < node_list.length; i++) {
      let curr_node:Element = node_list[i];
      //忽略子节点中的换行和空格
      if (curr_node.nodeType == 3) {
        continue;
      }
      //如果子节点还包括子节点，则继续进行遍历
      if (curr_node.childNodes.length > 1) {
        buffer.push('"' + curr_node.nodeName + '": {');
        generate(curr_node.childNodes);
      } else {
        let firstChild:ChildNode = curr_node.childNodes[0];

        if (firstChild != null) {
          //nodeValue不为null
          buffer.push(
            '"' + curr_node.nodeName + '":"' + firstChild.nodeValue + '"'
          );
        } else {
          //nodeValue为null
          buffer.push('"' + curr_node.nodeName + '":""');
        }
      }
      if (i < node_list.length - 2) {
        buffer.push(",");
      } else {
        break;
      }
    }
    //添加末尾的"}"
    buffer.push("}");
  }

  jsonStr = buffer.join("");
  return jsonStr;
}

function OBJtoXML(obj:any):string {
  let xml:string = "";
  for (let prop in obj) {
    xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (let array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
  return xml;
}

function luaToChoose(data: { root: { RPscoreInfo: string; }; }):any[]|boolean {  
  let datas:string = data.root.RPscoreInfo;
  console.log(datas);
  if (!datas) {
    return false;
  }
  let dataObj:any[] = [];
  _.times(20, (i:number) => {
    i = i + 1;
    if (i<=10) {
      if (datas.indexOf(`DX${fix(i,2)}`) != -1) {
        let statr = datas.indexOf(`DX${fix(i,2)}`);
        let end = datas.indexOf(`^`, statr);
        dataObj[i - 1] = datas.substring(statr, end == -1 ? undefined : end);
      } else {
        dataObj[i - 1] = "";
      }
    }else{
      if (datas.indexOf(`KG04${fix(i,2)}`) != -1) {
        let statr = datas.indexOf(`KG04${fix(i,2)}`);
        let end = datas.indexOf(`^`, statr);
        dataObj[i - 1] = datas.substring(statr, end == -1 ? undefined : end);
      } else {
        dataObj[i - 1] = "";
      }
    }
  });

  _.each(dataObj, (d:string, i:number) => {
    // DX01|4|55.000000|110.00|2.00|2023/6/24 9:03:36|2
    
    if (d != "") {
      let indexVal:number = d.indexOf("|");
      let dataTemp:string[]|number[] = [];
      let tempObj:any = {};
      for (let i = 0; i < d.length; i++) {
        let charAt = d.charAt(i);
        if (tempObj[charAt]) {
          tempObj[charAt]++;
        } else {
          tempObj[charAt] = 1;
        }
      }
      _.times(tempObj["|"], (j:number) => {
        let newIndex:number|undefined = d.indexOf("|", indexVal + 1);
        newIndex = newIndex == -1 ? undefined : newIndex;
        let data:string|number = d.substring(indexVal + 1, newIndex);
        indexVal = newIndex as number;
        data = _.toNumber(data);
        dataTemp[j] = data;
      });
      console.log(allChooses);
      
      dataObj[i] = {
        all: [dataTemp[1]],
        name: allChooses[i].name,
        times: dataTemp[0],
        height: dataTemp[2],
      };
    } else {
      dataObj[i] = {
        all: [],
        name: allChooses[i].name,
        times: 0,
        type: "no_data",
      };
    }
  });
  console.log(dataObj);
  
  return dataObj as any[];
}
function fix(num: string | number, length: number) {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num
}

export { toXmlDom, OBJtoXML, convertToJSON, luaToChoose };
