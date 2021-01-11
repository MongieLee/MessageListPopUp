/**
 * @description: 返回字符串
 * @param {string} type 状态0和1
 * @return {string} 0代表
 */
const getType = (type) => {
  const map = {
    0: "审核",
    1: "弃审",
  };
  return map[type];
};
console.log("fuck");

/**
 * @description:初始化容器dom
 * @param {any[]} data 数据源
 * @return {void} 无
 */
const initContainer = (data) => {
  console.log("????");
  const container = document.createElement("div");
  container.innerHTML = `
    <img class="biz-showMessageBlock" id="biz-showMessageBlock" src="~/Content/img/ProduceImg/Info.png" />
    <div class="biz-container" id="biz-tContainer">
        <div class="biz-top-title">
            <img id="biz-magnifyBtn" src="~/Content/img/ProduceImg/KHCFDC.png" alt="放大"/>
            <img id="biz-dwindleBtn" class="biz-off" src="~/Content/img/ProduceImg/small.png" alt="缩小"/>
            <img id="biz-closeBtn" src="~/Content/img/ProduceImg/close.png" style="margin-left:1em;margin-right:1em;" alt="关闭"/>
        </div>
        <div id="biz-mainContent" class="biz-concent"></div>
        <div id="biz-noData" class="biz-concent biz-flex biz-content-no-data">
            <span>暂无数据！</span>
        </div>
    </div>`;
  document.body.insertBefore(container, document.body.children[0]);
};

window._infoList = {
  init: (data) => {
    initContainer();
    setList(data);
  },
  update: (data) => {
    setList(data);
  },
  TimeStamp: TimeStamp,
};

const setList = (options) => {
  // options={
  //     data:data,
  //     readOnClick=(itemData)=>{

  //     }
  // }
  const { data } = options;
  console.log(data);
  const showMessageBlock = document.querySelector("#biz-showMessageBlock");
  const magnifyBtn = document.querySelector("#biz-magnifyBtn");
  const dwindleBtn = document.querySelector("#biz-dwindleBtn");
  const mainContent = document.querySelector("#biz-mainContent");
  const closeBtn = document.querySelector("#biz-closeBtn");
  const noData = document.querySelector("#biz-noData");
  const tContainer = document.querySelector("#biz-tContainer");
  //获取dom节点

  getInfoList();
  function getInfoList() {
    const itemList = document.querySelectorAll(".biz-selector-class");
    console.log(data.length);
    if (data.length > 0) {
      tContainer.classList.remove("biz-off");
      showMessageBlock.classList.add("biz-off");

      mainContent.classList.remove("biz-off");
      noData.classList.add("biz-off");
      for (let i = 0; i < itemList.length; i++) {
        itemList[i].remove();
      }
    } //如果已经有数据，则清除全部重新渲染

    if (data.length === 0) {
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
    if (data.length > 0) {
      data.map((i) => {
        const div = document.createElement("div");
        div.classList.add("biz-selector-class");
        const span = document.createElement("span");
        const button = document.createElement("button");
        span.innerHTML = options.spanInnerHTML(i);
        button.classList.add("biz-item-btn");
        button.classList.add("biz-confirmBtn");
        button.textContent = "已阅";
        button.onclick = () => {
          button.parentElement.remove();
          options.readOnClick && options.readOnClick(i);
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
    }
  }
};

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
