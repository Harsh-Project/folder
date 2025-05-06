const { GetLocalStorage, SetLocalStorage } =await import( "./LocalStorage").then((module) => module);

export const Utility = {
  lightOrDark: function (color) {
    var colorToHex = color;
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
      r = parseInt(color[1]);
      g = parseInt(color[2]);
      b = parseInt(color[3]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }
      colorToHex = rgbToHex(r, g, b);
    } else {
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );
      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    if (hsp > 127.5) {
      return this.shade(colorToHex, -0.4);
    } else {
      return this.shade(colorToHex, 0.4);
    }
  },
  shade: function (color, percent) {
    var f = parseInt(color.slice(1), 16);
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    var R = f >> 16;
    var G = (f >> 8) & 0x00ff;
    var B = f & 0x0000ff;
    var shadeColor =
      "#" +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1);
    function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      var r = parseInt(result[1], 16);
      var g = parseInt(result[2], 16);
      var b = parseInt(result[3], 16);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    return hexToRgb(shadeColor);
  },
  isNull: function(x) {
    return x === void 0 || x == null || x.toString().trim() === '';
  },
  setupContainer: function () {
    if(!document.querySelector(".flits-account-page-nav")){
      return;
    }
    if(!document.querySelector(".flits-tabs-box")){
      return;
    }
    if(!document.querySelector(".flits-tabs-box").parentElement){
      return;
    }
    if(!document.querySelector(".flits-account-page-nav .flits-nav-tabs")){
      return;
    }
    if(!document.querySelector(".flits-tabs-box .flits-tab-box.flits-active")){
      return;
    }
    document.querySelector(".flits-account-page-nav").style.height = "auto";
    document.querySelector(".flits-tabs-box").parentElement.style.height = "auto";
    document.querySelector(".flits-tabs-box").style.height = "auto";
    if (window.innerWidth < 992) {
      document.querySelector(".flits-account-page-nav").style.height = "auto";
      document.querySelector(".flits-tabs-box").parentElement.style.height = "auto";
      document.querySelector(".flits-tabs-box").style.height = "auto";
      document.querySelector(".flits-tabs-box").style.minHeight = "auto";
    } else {
      var height = 0;
      var nav_height = document.querySelector(".flits-account-page-nav .flits-nav-tabs").offsetHeight;
      var pages_height = document.querySelector(".flits-tabs-box .flits-tab-box.flits-active").offsetHeight
      height = Math.max(nav_height, pages_height);
      document.querySelector(".flits-account-page-nav").style.height = height+"px";
      document.querySelector(".flits-tabs-box").parentElement.style.height = height+"px";
      document.querySelector(".flits-tabs-box").style.minHeight = height+"px";
    }
  },
  getURLParameter: function (name) {
    // eslint-disable-next-line no-useless-concat
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  },
  getCookie: function(name){
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  },
  setCookie: function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  generateUUIDv4: function(){
    const crypto = window.crypto || window.msCrypto;

    if (!crypto || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported.");
    }
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;
    const uuidSegments = [...randomBytes].map((byte, index) =>
      [4, 6, 8, 10].includes(index)
        ? `-${byte.toString(16)}`
        : byte.toString(16).padStart(2, "0")
    );
    return uuidSegments.join("");
  },
  setRequestId: function(){
    const uuid4 = Utility.generateUUIDv4();
    SetLocalStorage("login_request_id", uuid4);
    return uuid4;
  },
  isValidRequestId: function(requestId){
    var generatedRequestId = GetLocalStorage("login_request_id");
    return requestId === generatedRequestId;
  },
  parseURL: function (url) {
    var parser = document.createElement('a');
    var searchObject = {};
    var queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
      split = queries[i].split('=');
      searchObject[split[0]] = split[1];
    }
    return {
      protocol: parser.protocol,
      host: parser.host,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      searchObject: searchObject,
      hash: parser.hash
    };
  },
  dispatchEvent: function (name, data) {
    document.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: data }));
  },
  subscribeEvent: function (eventName, listener) {
    document.addEventListener(eventName, listener);
  },
  unsubscribeEvent: function(eventName, listener) {
    document.removeEventListener(eventName, listener);
  },
  debounce: function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (callNow) func.apply(context, args);
    }
  }
};