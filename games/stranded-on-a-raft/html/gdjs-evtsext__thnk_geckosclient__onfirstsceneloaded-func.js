
if (typeof gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded !== "undefined") {
  gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded = {};


gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.userFunc0x234ac78 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// Load THNK Geckos Client Adapter (https://github.com/arthuro555/THNK)
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@yandeu/events/cjs/version.js
  var require_version = __commonJS({
    "node_modules/@yandeu/events/cjs/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VERSION = void 0;
      exports.VERSION = "0.0.6";
    }
  });

  // node_modules/@yandeu/events/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/@yandeu/events/cjs/index.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Events = void 0;
      var version_1 = require_version();
      var EE = function() {
        function EE2(fn, context, once) {
          if (once === void 0) {
            once = false;
          }
          this.fn = fn;
          this.context = context;
          this.once = once;
        }
        return EE2;
      }();
      var addListener = function(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once);
        if (!emitter._events.has(event))
          emitter._events.set(event, listener), emitter._eventsCount++;
        else if (!emitter._events.get(event).fn)
          emitter._events.get(event).push(listener);
        else
          emitter._events.set(event, [emitter._events.get(event), listener]);
        return emitter;
      };
      var clearEvent = function(emitter, event) {
        if (--emitter._eventsCount === 0)
          emitter._events = /* @__PURE__ */ new Map();
        else
          emitter._events.delete(event);
      };
      var Events2 = function() {
        function Events3() {
          this._events = /* @__PURE__ */ new Map();
          this._eventsCount = 0;
        }
        Object.defineProperty(Events3, "VERSION", {
          get: function() {
            return version_1.VERSION;
          },
          enumerable: false,
          configurable: true
        });
        Events3.prototype.eventNames = function() {
          return Array.from(this._events.keys());
        };
        Events3.prototype.listeners = function(event) {
          var handlers = this._events.get(event);
          if (!handlers)
            return [];
          if (handlers.fn)
            return [handlers.fn];
          for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
            ee[i] = handlers[i].fn;
          }
          return ee;
        };
        Events3.prototype.listenerCount = function(event) {
          var listeners = this._events.get(event);
          if (!listeners)
            return 0;
          if (listeners.fn)
            return 1;
          return listeners.length;
        };
        Events3.prototype.emit = function(event) {
          var _a, _b;
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
          }
          if (!this._events.has(event))
            return false;
          var listeners = this._events.get(event);
          var i;
          if (listeners.fn) {
            if (listeners.once)
              this.removeListener(event, listeners.fn, void 0, true);
            return (_a = listeners.fn).call.apply(_a, __spreadArray([listeners.context], args, false)), true;
          } else {
            var length_1 = listeners.length;
            for (i = 0; i < length_1; i++) {
              if (listeners[i].once)
                this.removeListener(event, listeners[i].fn, void 0, true);
              (_b = listeners[i].fn).call.apply(_b, __spreadArray([listeners[i].context], args, false));
            }
          }
          return true;
        };
        Events3.prototype.on = function(event, fn, context) {
          return addListener(this, event, fn, context, false);
        };
        Events3.prototype.once = function(event, fn, context) {
          return addListener(this, event, fn, context, true);
        };
        Events3.prototype.removeListener = function(event, fn, context, once) {
          if (!this._events.has(event))
            return this;
          if (!fn) {
            clearEvent(this, event);
            return this;
          }
          var listeners = this._events.get(event);
          if (listeners.fn) {
            if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
              clearEvent(this, event);
            }
          } else {
            for (var i = 0, events = [], length = listeners.length; i < length; i++) {
              if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
              }
            }
            if (events.length)
              this._events.set(event, events.length === 1 ? events[0] : events);
            else
              clearEvent(this, event);
          }
          return this;
        };
        Events3.prototype.removeAllListeners = function(event) {
          if (event) {
            if (this._events.delete(event))
              clearEvent(this, event);
          } else {
            this._events = /* @__PURE__ */ new Map();
            this._eventsCount = 0;
          }
          return this;
        };
        Object.defineProperty(Events3.prototype, "off", {
          get: function() {
            return this.removeListener;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Events3.prototype, "addListener", {
          get: function() {
            return this.on;
          },
          enumerable: false,
          configurable: true
        });
        return Events3;
      }();
      exports.Events = Events2;
    }
  });

  // node_modules/@geckos.io/common/lib/bridge.js
  var import_events = __toESM(require_cjs(), 1);
  var Bridge = class {
    constructor() {
      this.eventEmitter = new import_events.Events();
    }
    emit(eventName, data, connection = {}) {
      this.eventEmitter.emit(eventName, data, connection);
    }
    on(eventName, cb) {
      return this.eventEmitter.on(eventName, (data, options) => {
        cb(data, options);
      });
    }
    removeAllListeners() {
      this.eventEmitter.removeAllListeners();
    }
  };
  var bridge = new Bridge();

  // node_modules/@geckos.io/common/lib/constants.js
  var EVENTS = {
    CONNECT: "connect",
    CONNECTION: "connection",
    DATA_CHANNEL_IS_OPEN: "dataChannelIsOpen",
    DISCONNECT: "disconnect",
    DISCONNECTED: "disconnected",
    DROP: "dropped",
    ERROR: "error",
    RAW_MESSAGE: "rawMessage",
    RECEIVED_FROM_DATA_CHANNEL: "receiveFromDataChannel",
    SEND_OVER_DATA_CHANNEL: "sendOverDataChannel"
  };
  var ERRORS = {
    BROWSER_NOT_SUPPORTED: "BROWSER_NOT_SUPPORTED",
    COULD_NOT_PARSE_MESSAGE: "COULD_NOT_PARSE_MESSAGE",
    DROPPED_FROM_BUFFERING: "DROPPED_FROM_BUFFERING",
    MAX_MESSAGE_SIZE_EXCEEDED: "MAX_MESSAGE_SIZE_EXCEEDED"
  };

  // node_modules/@geckos.io/common/lib/types.js
  var ArrayBufferView = Object.getPrototypeOf(Object.getPrototypeOf(new Uint8Array())).constructor;

  // node_modules/@geckos.io/common/lib/helpers.js
  var tick = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
  var isStringMessage = (data) => {
    return typeof data === "string";
  };
  var isBufferMessage = (data) => {
    return data instanceof ArrayBuffer || data instanceof ArrayBufferView;
  };
  var isJSONMessage = (data) => {
    try {
      if (typeof data !== "string")
        return false;
      if (!isNaN(parseInt(data)))
        return false;
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  // node_modules/@geckos.io/common/lib/parseMessage.js
  var ParseMessage = (ev) => {
    let { data } = ev;
    if (!data)
      data = ev;
    const isBuffer = isBufferMessage(data);
    const isJson = isJSONMessage(data);
    const isString = isStringMessage(data);
    if (isJson) {
      const object = JSON.parse(data);
      const key = Object.keys(object)[0];
      const value = object[key];
      return { key, data: value };
    }
    if (isBuffer) {
      return { key: EVENTS.RAW_MESSAGE, data };
    }
    if (isString) {
      return { key: EVENTS.RAW_MESSAGE, data };
    }
    return { key: "error", data: new Error(ERRORS.COULD_NOT_PARSE_MESSAGE) };
  };
  var parseMessage_default = ParseMessage;

  // node_modules/@geckos.io/common/lib/sendMessage.js
  var SendMessage = (dataChannel, maxMessageSize, eventName, data = null) => {
    var _a;
    const send = (data2, isBuffer) => {
      var _a2;
      const bytes = (_a2 = data2.byteLength) !== null && _a2 !== void 0 ? _a2 : data2.length * 2;
      if (typeof maxMessageSize === "number" && bytes > maxMessageSize) {
        throw new Error(`maxMessageSize of ${maxMessageSize} exceeded`);
      } else {
        Promise.resolve().then(() => {
          if (dataChannel.send)
            dataChannel.send(data2);
          else {
            if (!isBuffer)
              dataChannel.sendMessage(data2);
            else
              dataChannel.sendMessageBinary(Buffer.from(data2));
          }
        }).catch((error) => {
          console.log("error", error);
        });
      }
    };
    if (!dataChannel)
      return;
    if (dataChannel.readyState === "open" || ((_a = dataChannel.isOpen) === null || _a === void 0 ? void 0 : _a.call(dataChannel))) {
      try {
        if (eventName === EVENTS.RAW_MESSAGE && data !== null && (isStringMessage(data) || isBufferMessage(data))) {
          send(data, isBufferMessage(data));
        } else {
          send(JSON.stringify({ [eventName]: data }), false);
        }
      } catch (error) {
        console.error("Error in sendMessage.ts: ", error.message);
        return error;
      }
    }
  };
  var sendMessage_default = SendMessage;

  // node_modules/@geckos.io/client/lib/wrtc/connectionsManager.js
  var ConnectionsManagerClient = class {
    constructor(url, authorization, label, rtcConfiguration) {
      this.url = url;
      this.authorization = authorization;
      this.label = label;
      this.rtcConfiguration = rtcConfiguration;
      this.bridge = new Bridge();
      this.onDataChannel = (ev) => {
        const { channel } = ev;
        if (channel.label !== this.label)
          return;
        this.dataChannel = channel;
        this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onmessage = (ev2) => {
          const { key, data } = parseMessage_default(ev2);
          this.bridge.emit(key, data);
        };
      };
    }
    emit(eventName, data = null) {
      sendMessage_default(this.dataChannel, this.maxMessageSize, eventName, data);
    }
    async fetchAdditionalCandidates(host, id) {
      var _a;
      if (((_a = this.dataChannel) === null || _a === void 0 ? void 0 : _a.readyState) === "closed")
        return;
      const res = await fetch(`${host}/connections/${id}/additional-candidates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        const candidates = await res.json();
        candidates.forEach((c) => {
          this.localPeerConnection.addIceCandidate(c);
        });
      }
    }
    async connect() {
      const host = `${this.url}/.wrtc/v2`;
      let headers = { "Content-Type": "application/json" };
      if (this.authorization)
        headers = { ...headers, ["Authorization"]: this.authorization };
      let userData = {};
      try {
        const res = await fetch(`${host}/connections`, {
          method: "POST",
          headers
        });
        if (res.status >= 300) {
          throw {
            name: "Error",
            message: `Connection failed with status code ${res.status}.`,
            status: res.status,
            statusText: res.statusText
          };
        }
        const json = await res.json();
        userData = json.userData;
        this.remotePeerConnection = json;
      } catch (error) {
        console.error(error.message);
        return { error };
      }
      const { id, localDescription } = this.remotePeerConnection;
      const configuration = {
        sdpSemantics: "unified-plan",
        ...this.rtcConfiguration
      };
      const RTCPc = RTCPeerConnection || webkitRTCPeerConnection;
      this.localPeerConnection = new RTCPc(configuration);
      const showBackOffIntervals = (attempts = 10, initial = 50, factor = 1.8, jitter = 20) => Array(attempts).fill(0).map((_, index) => parseInt((initial * factor ** index).toString()) + parseInt((Math.random() * jitter).toString()));
      showBackOffIntervals().forEach((ms) => {
        setTimeout(() => {
          this.fetchAdditionalCandidates(host, id).catch(() => {
          });
        }, ms);
      });
      try {
        await this.localPeerConnection.setRemoteDescription(localDescription);
        this.localPeerConnection.addEventListener("datachannel", this.onDataChannel, { once: true });
        const originalAnswer = await this.localPeerConnection.createAnswer();
        const updatedAnswer = new RTCSessionDescription({
          type: "answer",
          sdp: originalAnswer.sdp
        });
        await this.localPeerConnection.setLocalDescription(updatedAnswer);
        try {
          await fetch(`${host}/connections/${id}/remote-description`, {
            method: "POST",
            body: JSON.stringify(this.localPeerConnection.localDescription),
            headers: {
              "Content-Type": "application/json"
            }
          });
        } catch (error) {
          console.error(error.message);
          return { error };
        }
        const waitForDataChannel = () => {
          return new Promise((resolve) => {
            this.localPeerConnection.addEventListener("datachannel", () => {
              resolve();
            }, { once: true });
          });
        };
        if (!this.dataChannel)
          await waitForDataChannel();
        return {
          userData,
          localPeerConnection: this.localPeerConnection,
          dataChannel: this.dataChannel,
          id
        };
      } catch (error) {
        console.error(error.message);
        this.localPeerConnection.close();
        return { error };
      }
    }
  };

  // node_modules/@geckos.io/client/lib/wrtc/peerConnection.js
  var PeerConnection = class {
    async connect(connectionsManager) {
      const webRTCPcSupported = RTCPeerConnection || webkitRTCPeerConnection;
      if (webRTCPcSupported) {
        const { localPeerConnection, dataChannel, id, userData, error } = await connectionsManager.connect();
        if (error)
          return { error };
        if (!localPeerConnection || !dataChannel || !id || !userData)
          return { error: new Error('Something went wrong in "await connectionsManager.connect()"') };
        this.localPeerConnection = localPeerConnection;
        this.dataChannel = dataChannel;
        this.id = id;
        return { userData };
      } else {
        const error = new Error(ERRORS.BROWSER_NOT_SUPPORTED);
        console.error(error.message);
        return { error };
      }
    }
  };

  // node_modules/@geckos.io/common/lib/makeRandomId.js
  var makeRandomId = (length = 24) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  };
  var makeRandomId_default = makeRandomId;

  // node_modules/@geckos.io/common/lib/runInterval.js
  var runInterval = (interval = 200, runs = 1, cb) => {
    let counter = 0;
    if (typeof cb !== "function") {
      console.error("You have to define your callback function!");
      return;
    }
    const i = setInterval(() => {
      cb();
      counter++;
      if (counter === runs - 1) {
        clearInterval(i);
      }
    }, interval);
    cb();
  };
  var runInterval_default = runInterval;

  // node_modules/@geckos.io/common/lib/reliableMessage.js
  var makeReliable = (options, cb) => {
    const { interval = 150, runs = 10 } = options;
    const id = makeRandomId_default(24);
    runInterval_default(interval, runs, () => {
      cb(id);
    });
  };

  // node_modules/@geckos.io/client/lib/geckos/channel.js
  var ClientChannel = class {
    constructor(url, authorization, port, label, rtcConfiguration) {
      this.userData = {};
      this.receivedReliableMessages = [];
      this.url = port ? `${url}:${port}` : url;
      this.connectionsManager = new ConnectionsManagerClient(this.url, authorization, label, rtcConfiguration);
      this.bridge = this.connectionsManager.bridge;
      this.bridge.on(EVENTS.DISCONNECTED, () => this.bridge.removeAllListeners());
    }
    onconnectionstatechange() {
      const lpc = this.peerConnection.localPeerConnection;
      lpc.onconnectionstatechange = () => {
        if (lpc.connectionState === "disconnected" || lpc.connectionState === "closed")
          this.bridge.emit(EVENTS.DISCONNECTED);
      };
    }
    get id() {
      return this.peerConnection.id;
    }
    close() {
      this.peerConnection.localPeerConnection.close();
      this.bridge.emit(EVENTS.DISCONNECTED);
      try {
        const host = `${this.url}/.wrtc/v2`;
        fetch(`${host}/connections/${this.id}/close`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    emit(eventName, data = null, options) {
      if (options && options.reliable) {
        makeReliable(options, (id) => this.connectionsManager.emit(eventName, {
          MESSAGE: data,
          RELIABLE: 1,
          ID: id
        }));
      } else {
        this.connectionsManager.emit(eventName, data);
      }
    }
    get raw() {
      return {
        emit: (rawMessage) => this.emit(EVENTS.RAW_MESSAGE, rawMessage)
      };
    }
    onRaw(callback) {
      this.bridge.on(EVENTS.RAW_MESSAGE, (rawMessage) => {
        const cb = (rawMessage2) => callback(rawMessage2);
        cb(rawMessage);
      });
    }
    async onConnect(callback) {
      var _a;
      this.peerConnection = new PeerConnection();
      const response = await this.peerConnection.connect(this.connectionsManager);
      if (response.error)
        callback(response.error);
      else {
        if (response.userData)
          this.userData = response.userData;
        this.maxMessageSize = this.connectionsManager.maxMessageSize = (_a = this.peerConnection.localPeerConnection.sctp) === null || _a === void 0 ? void 0 : _a.maxMessageSize;
        this.onconnectionstatechange();
        callback();
      }
    }
    onDisconnect(callback) {
      this.bridge.on(EVENTS.DISCONNECTED, callback);
    }
    on(eventName, callback) {
      this.bridge.on(eventName, (data) => {
        const isReliableMessage = data && data.RELIABLE === 1 && data.ID !== "undefined";
        const expireTime = 15e3;
        const deleteExpiredReliableMessages = () => {
          const currentTime = new Date().getTime();
          this.receivedReliableMessages.forEach((msg, index, object) => {
            if (msg.expire <= currentTime) {
              object.splice(index, 1);
            }
          });
        };
        if (isReliableMessage) {
          deleteExpiredReliableMessages();
          if (this.receivedReliableMessages.filter((obj) => obj.id === data.ID).length === 0) {
            this.receivedReliableMessages.push({
              id: data.ID,
              timestamp: new Date(),
              expire: new Date().getTime() + expireTime
            });
            callback(data.MESSAGE);
          } else {
          }
        } else {
          callback(data);
        }
      });
    }
  };
  var geckosClient = (options = {}) => {
    const { authorization = void 0, iceServers = [], iceTransportPolicy = "all", label = "geckos.io", port = 9208, url = `${location.protocol}//${location.hostname}` } = options;
    return new ClientChannel(url, authorization, port, label, { iceServers, iceTransportPolicy });
  };
  var channel_default = geckosClient;

  // code/adapters/geckos-client.ts
  var logger = new gdjs.Logger("THNK - Geckos.io Adapter");
  THNK.GeckosClientAdapter = class GeckosClientAdapter extends THNK.ClientAdapter {
    ip;
    port;
    connection = null;
    constructor(ip, port) {
      super();
      this.ip = `http://${ip}`;
      this.port = port;
    }
    async prepare() {
      this.connection = channel_default({ url: this.ip, port: this.port, label: "THNK" });
      await new Promise(
        (resolve, reject) => this.connection.onConnect((error) => {
          if (error)
            return reject(error.message);
          this.connection.onRaw(
            (message) => this.onMessage(message)
          );
          this.connection.onDisconnect(() => this.onDisconnection());
          resolve();
        })
      );
    }
    close() {
      if (this.connection)
        this.connection.close();
    }
    doSendMessage(message) {
      if (!this.connection) {
        return logger.error(
          "Tried to send a message on an unestablished connection!"
        );
      }
      this.connection.raw.emit(
        message.buffer.slice(message.buffer.byteLength - message.byteLength)
      );
    }
    getServerIP() {
      return this.ip;
    }
    getServerPort() {
      return this.port;
    }
  };
})();
/**
 * @package      npmjs.com/package/@yandeu/events (events.min.js)
 *
 * @author       Arnout Kazemier (https://github.com/3rd-Eden)
 * @copyright    Copyright (c) 2014 Arnout Kazemier
 * @license      {@link https://github.com/primus/eventemitter3/blob/master/LICENSE|MIT}
 *
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/events
 * @license      {@link https://github.com/yandeu/events/blob/master/LICENSE|MIT}
 */

};
gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.userFunc0x234ac78(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.eventsList0(runtimeScene, eventsFunctionContext);

return;
}

gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.registeredGdjsCallbacks = [];
gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.func(runtimeScene, runtimeScene);
})
gdjs.registerFirstRuntimeSceneLoadedCallback(gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.registeredGdjsCallbacks[gdjs.evtsExt__THNK_GeckosClient__onFirstSceneLoaded.registeredGdjsCallbacks.length - 1]);
