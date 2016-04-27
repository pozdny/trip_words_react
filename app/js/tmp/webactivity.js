/*
 * Devices platform
 */

var platform = getDevice();

function setPlatform(input) {
    platform = input;
}

function getDevice() {
    var ua = navigator.userAgent;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var mac = ua.match(/(Mac OS X)/i);
    var device = {
    ios: ipad || iphone || ipod,
    android: android,
    mac: mac
    };
    
    if(device.ios) return "ios";
    if(device.android) return "android";
    if(device.mac) return "mac";
}

function getPlatform() {
    switch (platform) {
        case "android": alert("Android is current platform!"); break;
        case "ios": alert("iOS is current platform!"); break;
        case "mac": alert("Mac is current platform!"); break;
    }
}

/*
 * LocalStorage functions
 */

localStorage.removeItem = function(key) {
    if (typeof MyJS != "undefined") {
        MyJS.localStorageDeleted(key);
        MyJS.localStorageRemoveItem(key);
    }
    
    if (typeof JSAPI.bridge != "undefined") JSAPI.bridge("removeLocalStorageKey");
    
    delete localStorage[key];
}

localStorage.setItem = function(key, value) {
    if (typeof MyJS != "undefined") {
        MyJS.localStorageChanged(key); // deprecated method for synchronization with apple watch
        MyJS.localStorageSetItem(key, value);
    }
    
    if (typeof JSAPI.bridge != "undefined") JSAPI.bridge("localStorageSetItem");
    localStorage[key] = value;
}

localStorage.getItem = function(key) {
    if (typeof MyJS != "undefined") return MyJS.localStorageGetItem(key);
    
    if (typeof JSAPI.bridge != "undefined") return JSAPI.bridge("localStorageGetItem");
    return localStorage[key];
}

Storage.prototype.getKeys = function() {
    if (typeof MyJS != "undefined") return JSON.parse(MyJS.getLocalStorageKeys());
    if (typeof JSAPI.bridge != "undefined") return JSON.parse(JSAPI.bridge("getLocalStorageKeys")).keys;
    
    var keys = []; for (var i = localStorage.length; --i>=0;) keys.push(localStorage.key(i));
    return keys;
}

function localStorageGetItem(key) {
    return localStorage[key];
}

function localStorageSetItem(key, value) {
    localStorage[key] = value;
}

function localStorageGetKeys() {
    var str = '';
    for (var key in localStorage) {
        str += key + ","
    }
    str = str.slice(0, -1);
    return str;
}

/*
 * Getting GET arguments
 */

var localeVar = parseGET()['locale'];

function parseGET() {
    var tmp = new Array();
    var tmp2 = new Array();
    var get = new Array();
    
    var url = location.search;
    if (url != '') {
        tmp = (url.substr(1)).split('&');
        
        for(var i=0; i < tmp.length; i++) {
            tmp2 = tmp[i].split('=');
            
            get[tmp2[0]] = tmp2[1];
        }
    }
    
    return get;
}

/*
 * Event buffer variables
 */

var bufferEventVar = {
path: "",
longitude: 0,
latitude: 0,
altitude: 0,
speed: 0,
magneticHeading: 0,
trueHeading: 0,
x: 0,
y: 0,
z: 0,
batteryLevel: 0,
filePath: "",
locationInfo: ""
};

function getBufferEventVar() {
    return bufferEventVar;
}

function dispatchCustomEvent(eventName, data) {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, true, false, data);
    window.dispatchEvent(evt);
}

/*
 * Event initialization
 */

var deviceReadyEvent;

var appMinimizeEvent;
var appMaximizeEvent;
var appCloseEvent;

var magneticHeadingEvent;
var locationChangedEvent;
var accelerometerChangedEvent;
var magneticFieldChangedEvent;

var batteryLevelChangedEvent;

var menuButtonEvent;
var backButtonEvent;
var volumeUpEvent;
var volumeDownEvent;

var cameraCapturedImageEvent;
var pickedImageEvent;
var pickedImageErrorEvent;

var downloadFileEvent;
var downloadFileErrorEvent;

var locationInfoEvent;

var mediaPreparedEvent;

var providerDisabledEvent;
var providerEnabledEvent;
var alarmEvent;
var filePartCopyEvent;
var finishFileCopyEvent;
var fakeUpdateStarted;
var fakeUpdateFinished;
var handMoveEvent;
var pedometrEvent;
var callMoveEvent;

/*
 * Social
 */

var getParamsEvent;

/*
 * In-Apps
 */

var purchaseEvent;
var purchaseExitEvent;
var productDataEvent;

/*
 * Banner Ad
 */

var adCrossClickedEvent;
var onAdDisableError;
var onAdDisabled;

/*
 * Create Events
 */

document.addEventListener('DOMContentLoaded', function() {
                          
                          deviceReadyEvent = document.createEvent('Event');
                          deviceReadyEvent.initEvent('deviceReadyEvent', false, false);
                          
                          appMinimizeEvent = document.createEvent('Event');
                          appMinimizeEvent.initEvent('appMinimizeEvent', false, false);
                          
                          appMaximizeEvent = document.createEvent('Event');
                          appMaximizeEvent.initEvent('appMaximizeEvent', false, false);
                          
                          appCloseEvent = document.createEvent('Event');
                          appCloseEvent.initEvent('appCloseEvent', false, false);
                          
                          magneticHeadingEvent = document.createEvent('Event');
                          magneticHeadingEvent.initEvent('magneticHeadingEvent', false, false);
                          
                          locationChangedEvent = document.createEvent('Event');
                          locationChangedEvent.initEvent('locationChangedEvent', false, false);
                          
                          accelerometerChangedEvent = document.createEvent('Event');
                          accelerometerChangedEvent.initEvent('accelerometerChangedEvent', false, false);
                          
                          magneticFieldChangedEvent = document.createEvent('Event');
                          magneticFieldChangedEvent.initEvent('magneticFieldChangedEvent', false, false);
                          
                          batteryLevelChangedEvent = document.createEvent('Event');
                          batteryLevelChangedEvent.initEvent('batteryLevelChangedEvent', false, false);
                          
                          menuButtonEvent = document.createEvent('Event');
                          menuButtonEvent.initEvent('menubutton', false, false);
                          
                          backButtonEvent = document.createEvent('Event');
                          backButtonEvent.initEvent('backbutton', false, false);
                          
                          volumeUpEvent = document.createEvent('Event');
                          volumeUpEvent.initEvent('volumeup', false, false);
                          
                          volumeDownEvent = document.createEvent('Event');
                          volumeDownEvent.initEvent('volumedown', false, false);
                          
                          cameraCapturedImageEvent = document.createEvent('Event');
                          cameraCapturedImageEvent.initEvent('cameraCapturedImageEvent', false, false);
                          
                          pickedImageEvent = document.createEvent('Event');
                          pickedImageEvent.initEvent('pickedImageEvent', false, false);
                          
                          pickedImageErrorEvent = document.createEvent('Event');
                          pickedImageErrorEvent.initEvent('pickedImageErrorEvent', false, false);
                          
                          downloadFileEvent = document.createEvent('Event');
                          downloadFileEvent.initEvent('downloadFileEvent', false, false);
                          
                          downloadFileErrorEvent = document.createEvent('Event');
                          downloadFileErrorEvent.initEvent('downloadFileErrorEvent', false, false);
                          
                          locationInfoEvent = document.createEvent('Event');
                          locationInfoEvent.initEvent('locationInfoEvent', false, false);
                          
                          mediaPreparedEvent = document.createEvent('Event');
                          mediaPreparedEvent.initEvent('mediaPrepared', false, false);
                          
                          providerDisabledEvent = document.createEvent('Event');
                          providerDisabledEvent.initEvent('providerDisabledEvent', false, false);
                          
                          providerEnabledEvent = document.createEvent('Event');
                          providerEnabledEvent.initEvent('providerEnabledEvent', false, false);
                          
                          alarmEvent = document.createEvent('Event');
                          alarmEvent.initEvent('alarmEvent', false, false);
                          
                          filePartCopyEvent = document.createEvent('Event');
                          filePartCopyEvent.initEvent('filePartCopyEvent', false, false);
                          
                          finishFileCopyEvent = document.createEvent('Event');
                          finishFileCopyEvent.initEvent('finishFileCopyEvent', false, false);
                          
                          fakeUpdateStarted = document.createEvent('Event');
                          fakeUpdateStarted.initEvent('fakeUpdateStarted', false, false);
                          
                          fakeUpdateFinished = document.createEvent('Event');
                          fakeUpdateFinished.initEvent('fakeUpdateFinished', false, false);
                          
                          handMoveEvent = document.createEvent('Event');
                          handMoveEvent.initEvent('handMoveEvent', false, false);
                          
                          pedometrEvent = document.createEvent('Event');
                          pedometrEvent.initEvent('pedometrEvent', false, false);
                          
                          callMoveEvent = document.createEvent('Event');
                          callMoveEvent.initEvent('callMoveEvent', false, false);
                          
                          // Social
                          getParamsEvent = document.createEvent('CustomEvent');
                          getParamsEvent.initEvent('getParamsEvent', true, false);
                          
                          // LocalStorage
                          setItemCallback = document.createEvent('CustomEvent');
                          setItemCallback.initEvent('setItemCallback', true, false);
                          
                          getAllCallback = document.createEvent('CustomEvent');
                          getAllCallback.initEvent('getAllCallback', true, false);
                          
                          // In-Apps
                          purchaseEvent = document.createEvent('Event');
                          purchaseEvent.initEvent('purchaseEvent', false, false);
                          
                          productDataEvent = document.createEvent('Event');
                          productDataEvent.initEvent('productDataEvent', false, false);
                          
                          purchaseExitEvent = document.createEvent('Event');
                          purchaseExitEvent.initEvent('purchaseExitEvent', false, false);
                          
                          // Banner Ad
                          adCrossClickedEvent = document.createEvent('Event');
                          adCrossClickedEvent.initEvent('adCrossClickedEvent', false, false);
                          
                          onAdDisableError = document.createEvent('Event');
                          onAdDisableError.initEvent('onAdDisableError', false, false);
                          
                          onAdDisabled = document.createEvent('Event');
                          onAdDisabled.initEvent('onAdDisabled', false, false);
                          
                          // Встретились только в андроид версии !!!
                          screenOnEvent = document.createEvent('Event');
                          screenOnEvent.initEvent('screenOnEvent', false, false);
                          
                          screenOffEvent = document.createEvent('Event');
                          screenOffEvent.initEvent('screenOffEvent', false, false);
                          
                          }, false);

/*
 * JSAPI methods
 */

document.addEventListener("DOMContentLoaded", function() {
                          if (platform == "android") {
                          if (typeof JSAPI == 'object') {
                          return;
                          }
                          (function() {
                           JSAPI = function() {
                           function bridge(func) {
                           var args = Array.prototype.slice.call(arguments.callee.caller.arguments, 0);
                           var res = prompt("jsapi."+func, JSON.stringify(args));
                           try {
                           res = JSON.parse(res);
                           res = (res && res.result) ? res.result : null;
                           }
                           catch (e) {
                           res = null;
                           }
                           return JSON.parse(res);
                           }
                           
                           this.bridge = bridge;
                           
                           this.test = function() {
                           console.log("JSAPI: test() unavailable on Android.");
                           }
                           
                           this.log = function(input) {
                           console.log("JSAPI: log(\"" + input + "\") unavailable on Android.");
                           }
                           
                           this.keepScreenOn = function() {
                           bridge('keepScreenOn');
                           }
                           
                           this.unsetScreenOn = function() {
                           console.log("JSAPI: unsetScreenOn() unavailable on Android.");
                           }
                           
                           this.setFullScreen = function() {
                           bridge('setFullScreen');
                           }
                           
                           this.unsetFullScreen = function() {
                           bridge('unsetFullScreen');
                           }
                           
                           this.setStatusBarColor = function(input) {
                           console.log("JSAPI: setStatusBarColor(\"" + input + "\") unavailable on Android.");
                           }
                           
                           this.setButtonHandler = function(input) {
                           bridge('setButtonHandler');
                           }
                           
                           this.unsetButtonHandler = function(input) {
                           bridge('unsetButtonHandler');
                           }
                           
                           this.reload = function() {
                           console.log("JSAPI: reload() unavailable on Android.");
                           }
                           
                           this.canVibrate = function() {
                           console.log("JSAPI: canVibrate() unavailable on Android.");
                           }
                           
                           this.vibrate = function(time) {
                           return bridge('vibration');
                           }
                           
                           this.getDeviceId = function() {
                           console.log("JSAPI: getDeviceId() unavailable on Android.");
                           }
                           
                           this.showAd = function() {
                           return bridge('showAd');
                           }
                           
                           this.createUnitNotif = function(type, time, alarmId, title, text, tickerText, vibrationTime, soundPath) {
                           return bridge('createUnitNotif');
                           }
                           
                           this.createRepeatNotif = function(type, time, timeInterval, alarmId, title, text, tickerText, vibrationTime, soundPath) {
                           return bridge('createRepeatNotif');
                           }
                           
                           this.createMultipleNotif = function(notifList) {
                           return bridge('createMultipleNotif');
                           }
                           
                           this.cancelNotif = function(alarmId) {
                           return bridge('cancelNotif');
                           }
                           
                           this.getSettings = function() {
                           console.log("JSAPI: getSettings() unavailable on Android.");
                           }
                           
                           
                           this.sharing=function(text){
                           return bridge('sharing');
                           }
                           
                           this.sharing=function(text,img){
                           return bridge('sharing');
                           }
                           
                           this.saveImage = function() {
                           return bridge('saveImage');
                           }
                           
                           this.saveFileFromUrl = function() {
                           bridge('saveFileFromUrl');
                           }
                           
                           this.listenLocation = function(minTime,  minDistance, providerStr) {
                           return bridge('listenLocation');
                           }
                           
                           this.stopListenLocation = function() {
                           return bridge('stopListenLocation');
                           }
                           
                           this.listenAccelerometer = function(delayMicrosec) {
                           return bridge('listenAccelerometerField');
                           }
                           
                           this.stopListenAccelerometer = function() {
                           return bridge('stopListenAccelerometerField');
                           }
                           
                           this.listenMagneticField = function(delayMicrosec) {
                           return bridge('listenMagneticField');
                           }
                           
                           this.stopListenMagneticField = function() {
                           return bridge('stopListenMagneticField');
                           }
                           
                           this.pickPhoto = function() {
                           return bridge('pickPhoto');
                           }
                           
                           this.takePhoto = function() {
                           return bridge('takePhoto');
                           }
                           
                           this.newMedia = function(link) {
                           return bridge("createMedia");
                           }
                           
                           this.mediaPlay = function(id) {
                           bridge("mediaPlay");
                           }
                           
                           this.mediaStop = function(id) {
                           bridge("mediaStop");
                           }
                           
                           this.mediaPause = function(id) {
                           bridge("mediaPause");
                           }
                           
                           this.mediaSetVolume = function(count, id) {
                           bridge("mediaSetVolume");
                           }
                           
                           this.mediaSeekTo = function(id, time) {
                           bridge("mediaSeekTo");
                           }
                           
                           this.mediaLoop = function(id, state) {
                           return bridge("mediaLoop");
                           }
                           
                           this.mediaGetDuration = function(mid) {
                           return bridge('mediaGetDuration');
                           }
                           
                           this.mediaGetPosition = function(mid) {
                           return bridge('mediaGetPosition');
                           }
                           
                           this.mediaRelease = function(id) {
                           bridge("mediaRelease");
                           }
                           
                           this.newSound = function(link) {
                           return bridge('newSound');
                           }
                           
                           this.playSound = function(id, vol) {
                           return bridge("playSound");
                           }
                           
                           this.setVolume = function(id, volume) {
                           console.log("JSAPI: setVolume(id: \""+id+"\", volume: \""+volume+"\") unavailable on Android.");
                           }
                           
                           this.playLoopedSound = function(id, vol) {
                           return bridge("playLoopedSound");
                           }
                           
                           this.stopSound = function(id) {
                           return bridge("stopSound");
                           }
                           
                           this.isFlashLight = function() {
                           return bridge('isFlashLight');
                           }
                           
                           this.flashLightOn = function() {
                           return bridge('flashLightOn');
                           }
                           
                           this.flashLightOff = function() {
                           return bridge('flashLightOff');
                           }
                           
                           this.flashLightLevel = function(input) {
                           console.log("JSAPI: flashLightLevel() unavailable on Android.");
                           }
                           
                           this.setScreenBrightness = function(input) {
                           return bridge('setScreenBrightness');
                           }
                           
                           this.getScreenBrightness = function() {
                           return bridge('getScreenBrightness');
                           }
                           
                           this.getBatteryLevel = function() {
                           return bridge('getBatteryLevel');
                           }
                           
                           this.startBatteryLevelChangedListen = function() {
                           return bridge('startBatteryLevelChangedListen');
                           }
                           
                           this.stopBatteryLevelChangedListen = function() {
                           return bridge('stopBatteryLevelChangedListen');
                           }
                           
                           this.clearCookies = function() {
                           return bridge('clearCookies');
                           }
                           
                           this.toast = function(message) {
                           return bridge('toast');
                           }
                           
                           this.changeOrientation = function(orientation) {
                           return bridge('changeOrientation');
                           }
                           
                           this.getContactList = function(params) {
                           return bridge('getContactList');
                           }
                           
                           this.getCallList = function(params) {
                           return bridge('getCallList');
                           }
                           
                           this.getInSmsList = function(params) {
                           return bridge('getInSmsList');
                           }
                           
                           this.getOutSmsList = function(params) {
                           return bridge('getOutSmsList');
                           }
                           
                           this.makePhoneCall = function(params) {
                           return bridge('makePhoneCall');
                           }
                           
                           this.sendSms = function(number,msg) {
                           return bridge('sendSms');
                           }
                           
                           this.createUnitAlarm = function(type,time,alarmId) {
                           return bridge('createUnitAlarm');
                           }
                           
                           this.createRepeatAlarm = function(type,time,timeInterval,alarmId) {
                           return bridge('createRepeatAlarm');
                           }
                           
                           this.cancelAlarm = function(alarmId) {
                           return bridge('cancelAlarm');
                           }
                           
                           this.cancelAlarm = function(alarmId) {
                           return bridge('cancelAlarm');
                           }
                           
                           this.getFileListForDir = function(dir) {
                           return bridge('getFileListForDir');
                           }
                           
                           this.getSdDir = function() {
                           return bridge('getSdDir');
                           }
                           
                           this.getRootDir = function() {
                           return bridge('getRootDir');
                           }
                           
                           this.copy = function(from, to) {
                           return bridge('copy');
                           }
                           
                           this.createDir = function(folder) {
                           return bridge('createDir');
                           }
                           
                           this.createFile = function(path) {
                           return bridge('createFile');
                           }
                           
                           this.deleteFile = function(path) {
                           return bridge('deleteFile');
                           }
                           
                           this.move = function(from, to) {
                           return bridge('move');
                           }
                           
                           this.getFileSize = function(path) {
                           return bridge('getFileSize');
                           }
                           
                           this.startListenGesture = function() {
                           return bridge('startListenGesture');
                           }
                           
                           this.stopListenGesture = function() {
                           return bridge('stopListenGesture');
                           }
                           
                           this.startListenPedometrPeriodic = function(interval,isSendUniqOnly) {
                           return bridge('startListenPedometrPeriodic');
                           }
                           
                           this.stopListenPedometr = function() {
                           return bridge('stopListenPedometr');
                           }
                           
                           this.startListenCallMove = function() {
                           return bridge('startListenCallMove');
                           }
                           
                           this.stopListenCallMove = function() {
                           return bridge('stopListenCallMove');
                           }
                           
                           this.isSDMounted = function() {
                           return bridge('isSDMounted');
                           }
                           
                           this.writeFileSD = function(filePath, text,isAppend) {
                           return bridge('writeFileSD');
                           }
                           
                           this.getTextFromFileSD = function(filePath ) {
                           return bridge('getTextFromFileSD');
                           }
                           
                           this.writeFileInternal = function(filePath, text, isAppend ) {
                           return bridge('writeFileInternal');
                           }
                           
                           this.getTextFromFileInternal = function(filePath) {
                           return bridge('getTextFromFileInternal');
                           }
                           
                           this.exit = function() {
                           return bridge('exit');
                           }
                           
                           this.openDatabase = function(dbName) {
                           return bridge('openDatabase');
                           }
                           
                           this.closeDatabase = function(dbName) {
                           return bridge('openDatabase');
                           }
                           
                           this.deleteDatabase = function(dbName) {
                           return bridge('deleteDatabase');
                           }
                           
                           this.rawQuery = function(dbName, query) {
                           return bridge('rawQuery');
                           }
                           
                           this.beginTransaction = function(dbName) {
                           return bridge('beginTransaction');
                           }
                           
                           this.endTransaction = function(dbName) {
                           return bridge('endTransaction');
                           }
                           
                           this.setTransactionSuccessful = function(dbName) {
                           return bridge('setTransactionSuccessful');
                           }
                           
                           this.insertInTable = function(dbName, tableName, data) {
                           return bridge('insertInTable');
                           }
                           
                           this.updateInTable = function(dbName, tableName, data,where) {
                           return bridge('updateInTable');
                           }
                           
                           this.deleteInTable = function(dbName, tableName,where) {
                           return bridge('deleteInTable');
                           }
                           
                           this.getActiveNetworkList = function() {
                           return bridge('getActiveNetworkList');
                           }
                           
                           this.getAvailableNetworkList = function() {
                           return bridge('getAvailableNetworkList');
                           }
                           
                           this.testMethod1 = function() {
                           return bridge('testMethod1');
                           }
                           
                           this.testMethod2 = function() {
                           return bridge('testMethod2');
                           }
                           
                           this.testMethod3 = function() {
                           return bridge('testMethod3');
                           }
                           
                           this.openURLinAppStore = function(input) {
                           console.log("JSAPI: openURLinAppStore(url: \""+input+"\") unavailable on Android.");
                           }
                           
                           this.openURLinBrowser = function(link) {
                           return bridge('openURLinBrowser');
                           }
                           
                           this.pushCustomEvent = function(input) {
                           return bridge('pushCustomEvent');
                           }
                           
                           this.downloadFile = function(input) {
                           console.log("JSAPI: downloadFile(url: \""+input+"\") unavailable on Android.");
                           }
                           
                           this.getLocationInfo = function(latitude, longitude) {
                           return bridge('getLocationInfo');
                           }
                           
                           // In-Apps
                           this.purchase = function(purchaseId){
                           return bridge('purchase');
                           }
                           
                           this.confirmReceipt = function(receiptId){
                           return bridge('confirmReceipt');
                           }
                           
                           this.requestProductData = function(){
                           return bridge('requestProductData');
                           }
                           
                           this.refreshPurchases = function(){
                           return bridge('refreshPurchases');
                           }
                           
                           // Banner Ad
                           this.enableCross = function() {
                           bridge('enableCross');
                           }
                           
                           this.disableAd = function() {
                           bridge('disableAd');
                           }
                           
                           this.isAdDisabled = function() {
                           var result = bridge('isAdDisabled');
                           if (result == "true") return true;
                           else return false;
                           }
                           
                           this.getProjectFile = function(fileName) {
                           console.warn('Not available in android');
                           }
                           
                           /**
                            * Проверка налиия камеры у девайса
                            * @return true, если камера есть и false, если её нет
                            */
                           this.hasDeviceCamera = function() {
                           return bridge("hasDeviceCamera") == "true" ? true : false;
                           }
                           
                           // Было только в андроид !!!
                           this.checkGps = function() {
                           var result = bridge('checkGps');
                           if (result == "true") return true;
                           return false;
                           }
                           
                           this.isGPSEnabled=function() {
                           return bridge('isGPSEnabled');
                           }
                           
                           this.isNetworkEnabled=function() {
                           return bridge('isNetworkEnabled');
                           }
                           
                           this.setIsAllowOffScreen=function(isAllow){
                           return bridge('setIsAllowOffScreen');
                           }
                           
                           this.startAudioRecord=function(){
                           return bridge('startAudioRecord');
                           }
                           
                           this.stopAudioRecord=function(){
                           return bridge('stopAudioRecord');
                           }
                           
                           this.startListenScreenPower=function(){
                           return bridge('startListenScreenPower');
                           }
                           
                           this.stopListenScreenPower=function(){
                           return bridge('stopListenScreenPower');
                           }
                           };
                           
                           window.JSAPI = new JSAPI();
                           })(window);
                          }
                          else if (platform == "ios") {
                          if (typeof JSAPI == 'object') {
                          return;
                          }
                          (function() {
                           JSAPI = function() {
                           this.console = true;
                           
                           this.test = function() {
                           if (this.console) console.log("JSAPI: test() invoked.");
                           if (typeof MyJS != "undefined") MyJS.test();
                           }
                           
                           this.log = function(input) {
                           console.log("JSAPI: log(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.log("JSAPI: "+ input);
                           }
                           
                           this.keepScreenOn = function() {
                           if (this.console) console.log("JSAPI: keepScreenOn() invoked.");
                           if (typeof MyJS != "undefined") MyJS.setLockDisabled();
                           }
                           
                           this.unsetScreenOn = function() {
                           if (this.console) console.log("JSAPI: unsetScreenOn() invoked.");
                           if (typeof MyJS != "undefined") MyJS.setLockEnabled();
                           }
                           
                           this.setFullScreen = function() {
                           if (this.console) console.log("JSAPI: setFullScreen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.hideStatusBar();
                           }
                           
                           this.unsetFullScreen = function() {
                           if (this.console) console.log("JSAPI: unsetFullScreen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.showStatusBar();
                           }
                           
                           this.setStatusBarColor = function(input) {
                           if (this.console) console.log("JSAPI: setStatusBarColor(\""+input+"\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setStatusBarColor(input);
                           }
                           
                           this.setButtonHandler = function(input) {
                           console.log("JSAPI: setButtonHandler() unavailable on iOS.");
                           }
                           
                           this.unsetButtonHandler = function(input) {
                           console.log("JSAPI: unsetButtonHandler() unavailable on iOS.");
                           }
                           
                           this.reload = function() {
                           if (this.console) console.log("JSAPI: reload() invoked.");
                           if (typeof MyJS != "undefined") MyJS.reloadView();
                           }
                           
                           this.canVibrate = function() {
                           if (this.console) console.log("JSAPI: canVibrate() invoked.");
                           if (typeof MyJS != "undefined") return (MyJS.canVibrate() == "true") ? true : false;
                           }
                           
                           this.vibrate = function(input) {
                           if (this.console) console.log("JSAPI: vibrate(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.vibrate(input);
                           }
                           
                           this.getDeviceId = function() {
                           if (this.console) console.log("JSAPI: getDeviceId() invoked.");
                           if (typeof MyJS != "undefined") return MyJS.getDeviceId();
                           }
                           
                           this.showAd = function() {
                           if (this.console) console.log("JSAPI: showAd() invoked.");
                           if (typeof MyJS != "undefined") MyJS.showAd();
                           }
                           
                           this.createUnitNotif = function(notificationMode, notTime, notifierId, topText, statusBar, fullText, vibrationTime, soundLink) {
                           if (this.console) console.log("JSAPI: createUnitNotif(mode: \""+notificationMode+"\", time: \""+notTime+"\", ID: \""+notifierId
                                                         +"\", text: \""+topText+"\", statusBar: \""+statusBar+"\", fullText: \""+fullText+"\", vibrationTime: \""+vibrationTime
                                                         +"\", sound: \""+soundLink+"\") invoked.");
                           var noTime = notTime/1000;
                           if (typeof MyJS != "undefined") MyJS.createNotificationwithIdwithDate(fullText, notifierId, noTime);
                           }
                           
                           this.createRepeatNotif = function(notificationMode, notTime, interval, notifierId, topText, statusBar, fullText, vibrationTime, soundLink) {
                           if (this.console) console.log("JSAPI: createUnitNotif(mode: \""+notificationMode+"\", time: \""+notTime+"\", interval: \""+interval
                                                         +"\", ID: \""+notifierId+"\", text: \""+topText+"\", statusBar: \""+statusBar+"\", fullText: \""+fullText+"\", vibrationTime: \""
                                                         +vibrationTime+"\", sound: \""+soundLink+"\") invoked.");
                           var noTime = notTime/1000;
                           if (typeof MyJS != "undefined") MyJS.createRepeatNotificationwithIdwithDatewithRepeatInterval(fullText, notifierId, noTime, interval);
                           }
                           
                           this.cancelNotif = function(input) {
                           if (this.console) console.log("JSAPI: cancelNotif(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.cancelNotification(input);
                           }
                           
                           this.getSettings = function() {
                           if (this.console) console.log("JSAPI: getNotificationSettings() invoked.");
                           if (typeof MyJS != "undefined") MyJS.getNotificationSettings();
                           }
                           
                           this.sharing = function (text, img) {
                           var imgBool = "false";
                           if (img) imgBool = "true";
                           if (this.console) console.log("JSAPI: share(text: \"" + text + "\", img: \"" + imgBool + "\")");
                           if (typeof MyJS != "undefined") MyJS.sharingwithImg(text, img);
                           }
                           
                           this.saveImage = function() {
                           console.log("JSAPI: saveImage() unavailable on iOS.");
                           }
                           
                           this.listenLocation = function(minDelay, minDistance, locationProvider){
                           if (this.console) console.log("JSAPI: listenLocation(delay: \""+minDelay+"\", distance: \""+minDistance+"\", provider: \""+locationProvider+"\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.listenLocation(locationProvider);
                           }
                           
                           this.stopListenLocation = function() {
                           if (this.console) console.log("JSAPI: stopListenLocation() invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopListenLocation();
                           }
                           
                           this.listenAccelerometer = function(delayMicrosec) {
                           if (this.console) console.log("JSAPI: listenAccelerometer("+delayMicrosec+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.listenAccelerometer();
                           }
                           
                           this.stopListenAccelerometer = function() {
                           if (this.console) console.log("JSAPI: stopListenAccelerometer() invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopListenAccelerometer();
                           }
                           
                           this.listenMagneticField = function(delayMicrosec) {
                           console.log("JSAPI: listenMagneticField() unavailable on iOS.");
                           }
                           
                           this.stopListenMagneticField = function() {
                           console.log("JSAPI: stopListenMagneticField() unavailable on iOS.");
                           }
                           
                           this.pickPhoto = function() {
                           if (this.console) console.log("JSAPI: pickPhoto() invoked.");
                           if (typeof MyJS != "undefined") MyJS.showPhotoView();
                           }
                           
                           this.takePhoto = function() {
                           if (this.console) console.log("JSAPI: takePhoto() invoked.");
                           if (typeof MyJS != "undefined") MyJS.takePhoto();
                           }
                           
                           this.newMedia = function(link) {
                           if (this.console) console.log("JSAPI: newMedia(" + link + ") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.newSound(link);
                           }
                           
                           this.mediaPlay = function(id) {
                           if (this.console) console.log("JSAPI: mediaPlay("+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.playMedia(id);
                           }
                           
                           this.mediaStop = function(id) {
                           if (this.console) console.log("JSAPI: mediaStop("+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopSound(id);
                           }
                           
                           this.mediaPause = function(id) {
                           if (this.console) console.log("JSAPI: mediaPause("+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.pauseSound(id);
                           }
                           
                           this.mediaSetVolume = function(id, volume) {
                           if (this.console) console.log("JSAPI: mediaSetVolume("+volume+", "+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.changeVolume(volume, id);
                           }
                           
                           this.mediaSeekTo = function(id, position) {
                           if (this.console) console.log("JSAPI: mediaSeekTo("+id+", "+position+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setPosition(id, position);
                           }
                           
                           this.mediaLoop = function(id, state) {
                           if (this.console) console.log("JSAPI: mediaLoop("+id+", "+state+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setLoop(id, state);
                           }
                           
                           this.mediaGetDuration = function(id) {
                           if (this.console) console.log("JSAPI: mediaGetDuration("+id+") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.getDuration(id);
                           }
                           
                           this.mediaGetPosition = function(id) {
                           if (this.console) console.log("JSAPI: mediaGetPosition("+id+") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.getPosition(id);
                           }
                           
                           this.mediaRelease = function(id) {
                           console.log("JSAPI: mediaRelease() unavailable on iOS.");
                           }
                           
                           this.newSound = function(link) {
                           if (this.console) console.log("JSAPI: newSound(" + link + ") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.newSound(link);
                           }
                           
                           this.playSound = function(id, volume) {
                           if (this.console) console.log("JSAPI: playSound("+id+", "+volume+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.playSoundwithVolume(id, volume);
                           }
                           
                           this.setVolume = function(id, volume) {
                           if (this.console) console.log("JSAPI: setVolume("+id+", "+volume+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.changeVolume(id, volume);
                           }
                           
                           this.playLoopedSound = function(id, volume) {
                           if (this.console) console.log("JSAPI: playLoopedSound("+id+", "+volume+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.playLoopedSoundwithVolume(id, volume);
                           }
                           
                           this.stopSound = function(id) {
                           if (this.console) console.log("JSAPI: stopSound(" + id + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopSound(id);
                           }
                           
                           this.isFlashLight = function() {
                           if (this.console) console.log("JSAPI: isFlashLight() invoked.");
                           if (typeof MyJS != "undefined") return (MyJS.isFlashLight() == "true") ? true : false;
                           }
                           
                           this.flashLightOn = function() {
                           if (this.console) console.log("JSAPI: flashLightOn() invoked.");
                           if (typeof MyJS != "undefined") MyJS.flashLightOn();
                           }
                           
                           this.flashLightOff = function() {
                           if (this.console) console.log("JSAPI: flashLightOff() invoked.");
                           if (typeof MyJS != "undefined") MyJS.flashLightOff();
                           }
                           
                           this.flashLightLevel = function(input) {
                           if (this.console) console.log("JSAPI: flashLightLevel(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.flashLightLevel(input);
                           }
                           
                           this.setScreenBrightness = function(input) {
                           if (this.console) console.log("JSAPI: setScreenBrightness(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setScreenBrightness(input);
                           }
                           
                           this.getScreenBrightness = function() {
                           if (this.console) console.log("JSAPI: getScreenBrightness() invoked.");
                           if (typeof MyJS != "undefined") return parseInt(MyJS.getScreenBrightness());
                           }
                           
                           this.getBatteryLevel = function() {
                           if (this.console) console.log("JSAPI: getBatteryLevel() invoked.");
                           if (typeof MyJS != "undefined") return parseInt(MyJS.getBatteryLevel());
                           }
                           
                           this.startBatteryLevelChangedListen = function() {
                           if (this.console) console.log("JSAPI: startBatteryLevelChangedListen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.startBatteryLevelChangedListen();
                           }
                           
                           this.stopBatteryLevelChangedListen = function() {
                           if (this.console) console.log("JSAPI: stopBatteryLevelChangedListen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopBatteryLevelChangedListen();
                           }
                           
                           this.clearCookies = function() {
                           if (this.console) console.log("JSAPI: clearCookies() invoked.");
                           if (typeof MyJS != "undefined") MyJS.clearCookies();
                           }
                           
                           this.toast = function(message) {
                           console.log("JSAPI: toast(message: \"" + message + "\") unavailable on iOS.");
                           }
                           
                           this.changeOrientation = function(orientation) {
                           console.log("JSAPI: changeOrientation(orientation: \"" + orientation + "\") unavailable on iOS.");
                           }
                           
                           this.getContactList = function(params) {
                           console.log("JSAPI: getContactList(params: \"" + params + "\") unavailable on iOS.");
                           }
                           
                           this.getCallList = function(params) {
                           console.log("JSAPI: getCallList(params: \"" + params + "\") unavailable on iOS.");
                           }
                           
                           this.getInSmsList = function(params) {
                           console.log("JSAPI: getInSmsList(params: \"" + params + "\") unavailable on iOS.");
                           }
                           
                           this.getOutSmsList = function(params) {
                           console.log("JSAPI: getOutSmsList(params: \"" + params + "\") unavailable on iOS.");
                           }
                           
                           this.makePhoneCall = function(params) {
                           console.log("JSAPI: makePhoneCall(params: \"" + params + "\") unavailable on iOS.");
                           }
                           
                           this.sendSms = function(number, msg) {
                           console.log("JSAPI: sendSms(number: \"" + number + "\", msg: \"" + msg + "\") unavailable on iOS.");
                           }
                           
                           this.createUnitAlarm = function(type,time,alarmId) {
                           console.log("JSAPI: createUnitAlarm(type: \"" + type + "\", time: \"" + time + "\", alarmId: \"" + alarmId + "\") unavailable on iOS.");
                           }
                           
                           this.createRepeatAlarm = function(type,time,timeInterval,alarmId) {
                           console.log("JSAPI: createRepeatAlarm(type: \"" + type + "\", time: \"" + time + "\", timeInterval: \"" + timeInterval + "\", alarmId: \"" + alarmId + "\") unavailable on iOS.");
                           }
                           
                           this.cancelAlarm = function(alarmId) {
                           console.log("JSAPI: cancelAlarm(alarmId: \"" + alarmId + "\") unavailable on iOS.");
                           }
                           
                           this.getFileListForDir = function(dir) {
                           console.log("JSAPI: getFileListForDir(dir: \"" + dir + "\") unavailable on iOS.");
                           }
                           
                           this.getSdDir = function() {
                           console.log("JSAPI: getSdDir() unavailable on iOS.");
                           }
                           
                           this.getRootDir = function() {
                           console.log("JSAPI: getRootDir() unavailable on iOS.");
                           }
                           
                           this.copy = function(from, to) {
                           console.log("JSAPI: copy(from: \"" + from + "\", to: \"" + to + "\") unavailable on iOS.");
                           }
                           
                           this.createDir = function(folder) {
                           console.log("JSAPI: createDir(folder: \"" + folder + "\") unavailable on iOS.");
                           }
                           
                           this.createFile = function(path) {
                           console.log("JSAPI: createFile(path: \"" + path + "\") unavailable on iOS.");
                           }
                           
                           this.deleteFile = function(path) {
                           console.log("JSAPI: deleteFile(path: \"" + path + "\") unavailable on iOS.");
                           }
                           
                           this.move = function(from, to) {
                           console.log("JSAPI: move(from: \"" + from + "\", to: \"" + to + "\") unavailable on iOS.");
                           }
                           
                           this.getFileSize = function(path) {
                           console.log("JSAPI: getFileSize(path: \"" + path + "\") unavailable on iOS.");
                           }
                           
                           this.startListenGesture = function() {
                           console.log("JSAPI: startListenGesture() unavailable on iOS.");
                           }
                           
                           this.stopListenGesture = function() {
                           console.log("JSAPI: stopListenGesture() unavailable on iOS.");
                           }
                           
                           this.startListenPedometrPeriodic = function(interval, isSendUniqOnly) {
                           console.log("JSAPI: startListenPedometrPeriodic(interval: \"" + interval + "\", isSendUniqOnly: \"" + isSendUniqOnly + "\") unavailable on iOS.");
                           }
                           
                           this.stopListenPedometr = function() {
                           console.log("JSAPI: stopListenPedometr() unavailable on iOS.");
                           }
                           
                           this.startListenCallMove = function() {
                           console.log("JSAPI: startListenCallMove() unavailable on iOS.");
                           }
                           
                           this.stopListenCallMove = function() {
                           console.log("JSAPI: stopListenCallMove() unavailable on iOS.");
                           }
                           
                           this.isSDMounted = function() {
                           console.log("JSAPI: isSDMounted() unavailable on iOS.");
                           }
                           
                           this.writeFileSD = function(filePath, text, isAppend) {
                           console.log("JSAPI: writeFileSD(filePath: \"" + filePath + "\", text: \"" + text + "\", isAppend: \"" + isAppend + "\") unavailable on iOS.");
                           }
                           
                           this.getTextFromFileSD = function(filePath) {
                           console.log("JSAPI: getTextFromFileSD(filePath: \"" + filePath + "\") unavailable on iOS.");
                           }
                           
                           this.writeFileInternal = function(filePath, text, isAppend ) {
                           console.log("JSAPI: writeFileInternal(filePath: \"" + filePath + "\", text: \"" + text + "\", isAppend: \"" + isAppend + "\") unavailable on iOS.");
                           }
                           
                           this.getTextFromFileInternal = function(filePath) {
                           console.log("JSAPI: getTextFromFileInternal(filePath: \"" + filePath + "\") unavailable on iOS.");
                           }
                           
                           this.exit = function() {
                           console.log("JSAPI: exit() unavailable on iOS.");
                           }
                           
                           this.openDatabase = function(dbName) {
                           console.log("JSAPI: openDatabase(dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.closeDatabase = function(dbName) {
                           console.log("JSAPI: closeDatabase(dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.deleteDatabase = function(dbName) {
                           console.log("JSAPI: deleteDatabase(dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.rawQuery = function(dbName, query) {
                           console.log("JSAPI: rawQuery(dbName: \"" + dbName + "\", query: \"" + query + "\") unavailable on iOS.");
                           }
                           
                           this.beginTransaction = function(dbName) {
                           console.log("JSAPI: beginTransaction(dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.endTransaction = function(dbName) {
                           console.log("JSAPI: endTransaction(dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.setTransactionSuccessful = function(dbName) {
                           console.log("JSAPI: setTransactionSuccessful(dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.insertInTable = function(dbName, tableName, data) {
                           console.log("JSAPI: insertInTable(dbName: \"" + dbName + "\", dbName: \"" + dbName + "\", dbName: \"" + dbName + "\") unavailable on iOS.");
                           }
                           
                           this.updateInTable = function(dbName, tableName, data, where) {
                           console.log("JSAPI: updateInTable(dbName: \"" + dbName + "\", tableName: \"" + tableName + "\", data: \"" + data + "\", where: \"" + where + "\") unavailable on iOS.");
                           }
                           
                           this.deleteInTable = function(dbName, tableName, where) {
                           console.log("JSAPI: deleteInTable(dbName: \"" + dbName + "\", tableName: \"" + tableName + "\", where: \"" + where + "\") unavailable on iOS.");
                           }
                           
                           this.getActiveNetworkList = function() {
                           console.log("JSAPI: getActiveNetworkList() unavailable on iOS.");
                           }
                           
                           this.getAvailableNetworkList = function() {
                           console.log("JSAPI: getAvailableNetworkList() unavailable on iOS.");
                           }
                           
                           this.testMethod1 = function() {
                           console.log("JSAPI: testMethod1() unavailable on iOS.");
                           }
                           
                           this.testMethod2 = function() {
                           console.log("JSAPI: testMethod2() unavailable on iOS.");
                           }
                           
                           this.testMethod3 = function() {
                           console.log("JSAPI: testMethod3() unavailable on iOS.");
                           }
                           
                           this.openURLinAppStore = function(input) {
                           if (this.console) console.log("JSAPI: openURLinAppStore(url: \"" + input + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.openURLinAppStore(input);
                           }
                           
                           this.openURLinBrowser = function(input) {
                           if (this.console) console.log("JSAPI: openURLinBrowser(url: \"" + input + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.openURLinBrowser(input);
                           }
                           
                           this.pushCustomEvent = function(input) {
                           if (this.console) console.log("JSAPI: pushCustomEvent(eventName: \"" + input + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.pushCustomEvent(input);
                           }
                           
                           this.downloadFile = function(input) {
                           if (this.console) console.log("JSAPI: downloadFile(url: \"" + input + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.downloadFile(input);
                           }
                           
                           this.getLocationInfo = function (latitude, longitude) {
                           if (this.console) console.log("JSAPI: getLocationInfo(latitude: \"" + latitude + "\", longitude: \"" + longitude + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.getLocationInfoByLatitudewithLongitude(latitude, longitude);
                           }
                           
                           // In-Apps
                           this.purchase = function(purchaseId) {
                           if (this.console) console.log("JSAPI: purchase(purchaseId: \"" + purchaseId + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.purchase(purchaseId);
                           }
                           
                           this.confirmReceipt = function(receiptId) {
                           if (this.console) console.log("JSAPI: confirmReceipt(receiptId: \"" + receiptId + "\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.confirmReceipt(receiptId);
                           }
                           
                           this.requestProductData = function() {
                           if (this.console) console.log("JSAPI: requestProductData() invoked.");
                           if (typeof MyJS != "undefined") MyJS.requestProductData();
                           }
                           
                           this.refreshPurchases = function() {
                           if (this.console) console.log("JSAPI: refreshPurchases() invoked.");
                           if (typeof MyJS != "undefined") MyJS.refreshPurchases();
                           }
                           
                           // Banner Ad
                           this.enableCross = function() {
                           if (this.console) console.log("JSAPI: enableCross() invoked.");
                           if (typeof MyJS != "undefined") MyJS.enableCross();
                           }
                           
                           this.disableAd = function() {
                           if (this.console) console.log("JSAPI: disableAd() invoked.");
                           if (typeof MyJS != "undefined") MyJS.disableAd();
                           }
                           
                           this.isAdDisabled = function() {
                           if (this.console) console.log("JSAPI: disableAd() invoked.");
                           if (typeof MyJS != "undefined") var result = MyJS.isAdDisabled();
                           
                           if (result == "true") return true;
                           else return false;
                           }
                           
                           this.getProjectFile = function(fileName) {
                           if (this.console) console.log("JSAPI: getProjectFile(\"" + fileName + "\") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.getProjectFile(fileName);
                           }
                           };
                           
                           window.JSAPI = new JSAPI();
                           })(window);
                          }
                          });

/*
 * Sound initialization
 */

function Sound(link) {
    
    this.id = JSAPI.newSound(link);
    this.mvolume = "1";
    
    this.volume = function(input) {
        this.mvolume = "" + input;
    }
    
    this.play = function() {
        JSAPI.playSound(this.id, this.mvolume);
    }
    
    this.playLooped = function() {
        JSAPI.playLoopedSound(this.id, this.mvolume);
    }
    
    this.stop = function() {
        JSAPI.stopSound(this.id);
    }
    
}

/*
 * Media initialization
 */

function Media(link) {
    
    this.id = "" + JSAPI.newMedia(link);
    this.isPlayed = false;
    
    this.play = function() {
        JSAPI.mediaPlay(this.id);
        this.isPlayed = true;
    }
    
    this.loop = function(state) {
        JSAPI.mediaLoop(this.id, state);
    }
    
    this.stop = function() {
        if (this.isPlayed) JSAPI.mediaStop(this.id);
        this.isPlayed = false;
    }
    
    this.pause = function() {
        if (this.isPlayed) JSAPI.mediaPause(this.id);
        this.isPlayed = false;
    }
    
    this.volume = function(count) {
        JSAPI.mediaSetVolume(""+count, this.id);
    }
    
    this.seekto = function(time) {
        JSAPI.mediaSeekTo(this.id, ""+time);
    }
    
    this.duration = function() {
        return JSAPI.mediaGetDuration(this.id);
    }
    
    this.position = function() {
        return JSAPI.mediaGetPosition(this.id);
    }
    
    this.release = function() {
        JSAPI.mediaRelease(this.id);
    }
}