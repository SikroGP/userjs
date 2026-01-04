// ==UserScript==
// @name          提取MissAV视频链接
// @description   提取MissAV视频链接
// @icon          https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://missav.live&size=256
// @match         https://missav123.com/*
// @match         https://missav.ws/*
// @match         https://missav.live/*
// @match         https://missav.ai/*
// @homepageURL   https://github.com/SikroGP/userjs
// @updateURL     https://gh.168364.xyz/raw.githubusercontent.com/SikroGP/userjs/master/getMissAvM3u8.user.js
// @downloadURL   https://gh.168364.xyz/raw.githubusercontent.com/SikroGP/userjs/master/getMissAvM3u8.user.js
// @version       1.1.0.1
// @author        Sikro
// @grant         GM_setClipboard
// @namespace     Sikro
// ==/UserScript==
(function () {
  /**
   * 用原生 JS 封装一个 Toast 组件
   */
  var Toast = {
    // 隐藏的 setTimeOut 引用
    hideTimeOut: null,
    /**
     * 初始化
     */
    init: function () {
      var domToastWaka = document.getElementById('toastWaka');
      if (!domToastWaka) {
        var toastNode = document.createElement('section');
        toastNode.innerHTML = '<i class="iconfont icon-success"></i><i class="iconfont icon-error"></i><span class="text">111</span>';
        toastNode.id = 'toastWaka'; // 设置id，一个页面有且仅有一个Toast
        toastNode.setAttribute('style', 'position:fixed;display:none;left:50%;top:50%;z-index:99999;margin:0 auto;-webkit-transform:translate(-50%);transform:translate(-50%);width:120px;height:40px;line-height:40px;border-radius:5px;text-align:center;color:#fff;background-color:rgba(000,000,000,.5)');   // 设置样式
        toastNode.setAttribute('class', 'toast');   // 设置类名
        toastNode.style.display = 'none';   // 设置隐藏
        document.body.appendChild(toastNode);
        domToastWaka = toastNode
      }
      return domToastWaka;
    },
    /**
     * 显示Toast
     * @param text 文本内容
     * @param options 其他参数 { duration, type }
     * duration 持续时间(毫秒) 默认 2000
     * type 类型 success error (暂无)
     */
    show: function (text, options) {
      const { duration, type } = options ?? {};
      var that = this;
      // 确保上一次的 TimeOut 已被清空
      if (that.hideTimeOut) {
        clearTimeout(that.hideTimeOut);
        that.hideTimeOut = null;
        // console.error('上一次的 TimeOut 还未走完!');
        // return;
      }
      if (!text) {
        console.error('text 不能为空!');
        return;
      }
      var domToastWaka = document.getElementById('toastWaka');
      // console.log('domToastWaka', domToastWaka);
      if (!domToastWaka) {
        domToastWaka = that.init();
        // console.error('toastWaka DOM 不存在!');
        // return;
      }
      var domIconSuccess = domToastWaka.querySelector('.icon-success');   // 成功图标
      var domIconError = domToastWaka.querySelector('.icon-error');   // 错误图标
      var domToastText = domToastWaka.querySelector('.text');   // 文字
      domToastText.setAttribute('style', 'color:#fff;display:inline-block;font-size:14px;position:absolute;top:0;bottom:0;right:0;left:0');   // 设置文字样式
      domToastText.innerHTML = text || ' ';
      switch (type) {
        case 'success':
          domIconSuccess.style.display = 'inline-block';
          domIconError.style.display = 'none';
          break;
        case 'error':
          domIconSuccess.style.display = 'none';
          domIconError.style.display = 'inline-block';
          break;
        default:
          domIconSuccess.style.display = 'none';
          domIconError.style.display = 'none';
          break;
      }
      domToastWaka.style.display = 'block';
      // 不传的话默认2s
      that.hideTimeOut = setTimeout(function () {
        that.hide();    // 隐藏 Toast
      }, duration || 2000);
    },
    /**
     * 隐藏 Toast
     */
    hide: function () {
      var domToastWaka = document.getElementById('toastWaka');
      if (domToastWaka) {
        domToastWaka.style.display = 'none';
      }
      var that = this;
      // 如果 TimeOut 存在
      if (that.hideTimeOut) {
        // 清空 TimeOut 引用
        clearTimeout(that.hideTimeOut);
        that.hideTimeOut = null;
      }
    },
    /**
     * 删除 Toast
     */
    remove: function () {
      var domToastWaka = document.getElementById('toastWaka');
      if (domToastWaka) {
        document.body.removeChild(domToastWaka);
      }
    }
  };

  function showToast(text, ...args) {
    // Toast.init();
    const options = { duration: args[0], type: args[1] ?? '' };
    Toast.show(text, options);
  }

  function main() {
    const div = document.querySelector('div.mt-4 > div');
    let btnM3U8 = document.createElement('button');
    div.appendChild(btnM3U8);
    btnM3U8.outerHTML = `
      <button id="dataM3U8Info" class="inline-flex items-center whitespace-nowrap shadow-sm text-sm text-nord4 leading-4 font-medium focus:outline-none hover:text-nord6">
  <svg class="mr-1 md:mr-2 h-3 w-3 xs:h-4 xs:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" fill="currentColor" aria-hidden="true">
  <path d="M825.855 959.793h-371.11c-36.206 0-70.137-13.991-95.542-39.396-25.406-25.404-39.397-59.336-39.397-95.542V455.387c0-36.206 13.991-70.137 39.396-95.542s59.336-39.396 95.542-39.396h371.111c36.206 0 70.138 13.991 95.543 39.396 25.404 25.405 39.396 59.336 39.396 95.542v369.467c0 36.206-13.991 70.138-39.396 95.542-25.405 25.406-59.336 39.397-95.543 39.397z m-371.11-575.345c-39.779 0-70.939 31.16-70.939 70.939v369.467c0 39.778 31.16 70.938 70.939 70.938h371.111c39.778 0 70.938-31.16 70.938-70.938V455.387c0-39.779-31.16-70.939-70.938-70.939H454.745zM224.848 704.44h-24.994c-36.206 0-70.137-13.991-95.542-39.396s-39.396-59.337-39.396-95.543V199.634c0-36.207 13.991-70.137 39.396-95.542s59.336-39.396 95.542-39.396h371.21c36.206 0 70.138 13.991 95.543 39.396s39.396 59.336 39.396 95.542v25.194c0 17.673-14.327 32-32 32s-32-14.327-32-32v-25.194c0-39.779-31.16-70.939-70.939-70.939h-371.21c-39.779 0-70.938 31.16-70.938 70.939v369.867c0 39.779 31.16 70.939 70.938 70.939h24.994c17.673 0 32 14.327 32 32s-14.327 32-32 32zM673.573 799.382h-0.02l-162.453-0.101c-17.673-0.011-31.991-14.347-31.98-32.02 0.011-17.666 14.337-31.98 32-31.98h0.02l162.453 0.101c17.674 0.011 31.991 14.347 31.98 32.02-0.011 17.665-14.337 31.98-32 31.98zM764.829 544.586h-252.68c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h252.68c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32zM763.224 671.922h-252.68c-17.673 0-32-14.327-32-32s14.327-32 32-32h252.68c17.673 0 32 14.327 32 32s-14.328 32-32 32z"></path></svg>
  复制M3U8
  </button>
      `;
    document.querySelector('#dataM3U8Info').addEventListener('click', function () {
      let evalStr = document.documentElement.outerHTML.match(/eval\(function\(.*,\{\}\)\)/)[0];
      const m3u8 = eval(evalStr);
      const referer = window.location.href;
      dataM3U8Info = m3u8 + ',' + referer;
      console.log(dataM3U8Info);

      GM_setClipboard(dataM3U8Info);
      // GM_setClipboard(m3u8);

      // const { spawn } = require('child_process');
      // const childProcess = spawn('ls', ['-l']);
      // childProcess.stdout.on('data', (data) => {
      //   console.log(`stdout: ${data}`);
      // });
      // childProcess.stderr.on('data', (data) => {
      //   console.error(`stderr: ${data}`);
      // });
      // childProcess.on('close', (code) => {
      //   console.log(`child process exited with code ${code}`);
      // });


      // var cmd = new ActiveXObject("WScript.Shell");
      // const command = `pwsh -c potplayer '${m3u8}' /headers='User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'`;
      // cmd.run(command);
      // let quicker_action_url = `quicker:runaction:4b673957-6df1-4db9-a6ad-79202a91d917?dataM3U8Info`;
      // window.open(quicker_action_url,'quickerActionUrl');

      //         const postData = {
      //           "toUser":"yxx95lz@163.com",
      //           "code":"eJrrhI6B9e",
      //           "toDevice":"",
      //           "operation":"action",
      //           "data":dataM3U8Info,
      //           "action":"4b673957-6df1-4db9-a6ad-79202a91d917",
      //           "wait":false,
      //           "maxWaitMs":5000,
      //           "txt":false
      //         }
      //         const url = 'https://push.getquicker.cn/to/quicker';
      //         // axios.post(url, postData).then(function (res){
      //         //   console.log(res.data);
      //         // }).catch(function (error) {
      //         //   console.log(error);
      //         // });

      //         fetch(url, {
      //           method: "POST", // *GET, POST, PUT, DELETE, etc.
      //           headers: {
      //             "Content-Type": "application/json",
      //             // 'Content-Type': 'application/x-www-form-urlencoded',
      //           },body: JSON.stringify(postData), // body data type must match "Content-Type" header
      //         })
      //         .then((response) => response.json())
      //         .then((data) => {
      //           console.log("Success:", data);
      //           if(data.isSuccess) showToast('已打开到动作!');
      //           else showToast(data.errorMessage);
      //         }).catch(function (error) {
      //           console.error("Error:",error);
      //           showToast(`Err: ${error}`);
      //         });
      // GM_setClipboard(dataM3U8Info);
      // showToast('已打开到动作!');
    })
  }
  main();

})();