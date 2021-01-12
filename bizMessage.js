/*
 * @Author: LiMengjie
 * @Date: 2021-01-12 08:31:14
 * @LastEditTime: 2021-01-12 16:00:28
 * @LastEditors: Please set LastEditors
 * @Description: 全局消息弹窗插件，依赖于W9项目可用，需自行引入样式
 */

/**
 * @description:初始化容器dom
 * @param {null}
 * @return {void}
 */
function initContainer() {
  if (document.querySelector("#bizContainer")) {
    throw new Error("容器已存在，请不要重复初始化");
  }
  const container = document.createElement("div");
  container.id = "bizContainer";
  container.innerHTML = `
    <img class="biz-showMessageBlock" id="biz-showMessageBlock" src="/Content/img/ProduceImg/Info.png" alt=’‘/>
    <div class="biz-container" id="biz-tContainer">
        <div class="biz-top-title">
            <img id="biz-magnifyBtn" src="/Content/img/ProduceImg/KHCFDC.png" alt="放大"/>
            <img id="biz-dwindleBtn" class="biz-off" src="/Content/img/ProduceImg/small.png" alt="缩小"/>
            <img id="biz-closeBtn" src="/Content/img/ProduceImg/close.png" style="margin-left:1em;margin-right:1em;" alt="关闭"/>
        </div>
        <div id="biz-mainContent" class="biz-concent"></div>
        <div id="biz-noData" class="biz-concent biz-flex biz-content-no-data">
            <span>暂无数据！</span>
        </div>
    </div>`;
  document.body.insertBefore(container, document.body.children[0]);
}

/**
 * @description:
 * @param {
 *    {
 *    data:any:[],
 *    readOnClick:function(data){//data为每一项的数据源},
 *    spanInnerHTML:function(data){//data为每一项的数据源
 *    }
 * }
 * options {data:数据源,readOnClick:点击已阅的回调函数,spanInnerHTML:数据项的展示模板}
 * @return {void}
 */
function setList(options) {
  //options参数类型检查
  if (Object.keys(options).length !== 3) {
    removeContainer();
    throw new Error("请按照示例传入正确的对象键值对");
  }
  const { data, readOnClick, spanInnerHTML } = options;
  if (!(data instanceof Array)) {
    removeContainer();
    throw new Error("data必须为数组,请检查传参");
  }
  if (typeof readOnClick !== "function") {
    removeContainer();
    throw new Error("readOnClick必须是个函数,请检查传参");
  }
  if (typeof spanInnerHTML !== "function") {
    removeContainer();
    throw new Error("spanInnerHTML必须是个函数,请检查传参");
  }

  const showMessageBlock = document.querySelector("#biz-showMessageBlock");
  const magnifyBtn = document.querySelector("#biz-magnifyBtn");
  const dwindleBtn = document.querySelector("#biz-dwindleBtn");
  const mainContent = document.querySelector("#biz-mainContent");
  const closeBtn = document.querySelector("#biz-closeBtn");
  const noData = document.querySelector("#biz-noData");
  const tContainer = document.querySelector("#biz-tContainer");
  //获取DOM节点

  getMessageList.call(null);
  function getMessageList() {
    if (data.length > 0) {
      //隐藏缩略图，显式列表容器
      tContainer.classList.remove("biz-off");
      showMessageBlock.classList.add("biz-off");

      //隐藏空数据容器，显式数据列表
      mainContent.classList.remove("biz-off");
      noData.classList.add("biz-off");

      //已有数据项则清空重新渲染
      const itemList = document.querySelectorAll(".biz-selector-class");
      for (let i = 0; i < itemList.length; i++) {
        itemList[i].remove();
      }

      //遍历数据源并渲染数据项
      data.map((i) => {
        const div = document.createElement("div");
        div.classList.add("biz-selector-class");
        const span = document.createElement("span");
        const button = document.createElement("button");
        span.innerHTML = spanInnerHTML(i);
        button.classList.add("biz-item-btn");
        button.classList.add("biz-confirmBtn");
        button.textContent = "已阅";
        button.onclick = () => {
          button.parentElement.remove();
          readOnClick(i);
          if (document.querySelectorAll(".biz-content-item").length === 0) {
            mainContent.classList.add("biz-off");
            noData.classList.remove("biz-off");
            closeBtn.click();
          }
        };
        div.classList.add("biz-content-item");
        div.appendChild(span);
        div.appendChild(button);
        mainContent.appendChild(div);
      });
    } else {
      tContainer.classList.add("biz-off");
      showMessageBlock.classList.remove("biz-off");
      mainContent.classList.add("biz-off");
      noData.classList.remove("biz-off");
    }

    showMessageBlock.onclick = () => {
      tContainer.classList.remove("biz-off");
      showMessageBlock.classList.add("biz-off");
    };

    closeBtn.onclick = () => {
      tContainer.classList.add("biz-off");
      showMessageBlock.classList.remove("biz-off");
    };

    magnifyBtn.onclick = () => {
      tContainer.style.height = "600px";
      magnifyBtn.classList.add("biz-off");
      dwindleBtn.classList.remove("biz-off");
    };
    dwindleBtn.onclick = () => {
      tContainer.style.height = "280px";
      dwindleBtn.classList.add("biz-off");
      magnifyBtn.classList.remove("biz-off");
    };
  }
}

/**
 * @description: 删除弹窗实例的容器
 * @param {null}
 * @return {void}
 */
function removeContainer() {
  const container = document.querySelector("#bizContainer");
  container ? container.remove() : console.error("预期删除的DOM元素不存在");
}

//暴漏全局对象供调用
window.bizMessage = {
  init: (options) => {
    initContainer();
    setList(options);
  },
  update: (options) => {
    setList(options);
  },
  TimeStamp: TimeStamp,
};

/**
 * @description:
 * @param {string} time 传入time格式字符串
 * @return {string} 格式化后的字符村啊
 */
function TimeStamp(time) {
  if (!time) return;
  var Time = time.replace("T", " ");
  var datetime = new Date(Time);
  var year = datetime.getFullYear();
  var month =
    datetime.getMonth() + 1 < 10
      ? "0" + (datetime.getMonth() + 1)
      : datetime.getMonth() + 1;
  var date =
    datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour =
    datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute =
    datetime.getMinutes() < 10
      ? "0" + datetime.getMinutes()
      : datetime.getMinutes();
  var second =
    datetime.getSeconds() < 10
      ? "0" + datetime.getSeconds()
      : datetime.getSeconds();
  return (
    year + "-" + month + "-" + date + " " + hour + ": " + minute + ": " + second
  );
}
