// ==UserScript==
// @name          重新排列色中色网址
// @description   重新排列色中色网址
// @match         http://1u2u3u.com/
// @homepageURL   https://github.com/SikroGP/userjs
// @updateURL     https://gh.168364.xyz/raw.githubusercontent.com/SikroGP/userjs/master/sisurlrelist.user.js
// @downloadURL   https://gh.168364.xyz/raw.githubusercontent.com/SikroGP/userjs/master/sisurlrelist.user.js
// @version       1.1.0.1
// @author        Sikro
// @grant         none
// @namespace     Sikro
// ==/UserScript==
(
  function (){
    console.log(document.querySelectorAll('.entry-content p'));
    for (const p of Array.from(document.querySelectorAll('.entry-content p'))){
      var txt = p.innerText;
      if (/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.test(txt)) {
          let website = txt.split(' ')[0];
          if(!website.startsWith("http")) website = `http://${website}`;
          p.innerHTML = `<a href="${website}" target="_blank">${txt}</a>`;
      }
      if (/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/.test(txt)) {
          let website = txt.split(' ')[0];
          if(!website.startsWith("http")) website = `http://${website}`;
          p.innerHTML = `<a href="${website}" target="_blank">${txt}</a>`;
      }
    }
  }
)();