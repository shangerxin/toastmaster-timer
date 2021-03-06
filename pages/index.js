// pages/index.js

var imagePaths = {
  bell: "/images/bell.png",
  green: "/images/green.png",
  yellow: "/images/yellow.png",
  red: "/images/red.png",
  none: ""
};

var timerData = {
  get hours() {
    return Math.floor(this.totalPassedSeconds / 3600);
  },
  get minutes() {
    return Math.floor((this.totalPassedSeconds % 3600) / 60);
  },
  get seconds() {
    return this.totalPassedSeconds % 60;
  },
  totalPassedSeconds: 0,
  startTime: 0,
  isCountDown: true,
  targetSeconds: 0,
  isPaused: false,

  //type 0:2 green, 1 yellow, 0 red, overtime 30s bell
  //type 1:1 green, 30s yellow, 0 red, overtime 30s bell
  type: 0,
  timerHandleID: 0,
  timerHandler: null
};

function resetTimerState(page) {
  if (!page) {
    return;
  }

  var countDownhandler = function () {
    if (timerData.totalPassedSeconds <= 0) {
      return;
    }

    timerData.totalPassedSeconds--;
    updateDisplayTimerInfo(page);
    timerData.timerHandleID = setTimeout(countDownhandler, 1000);
  };

  var countHandler = function () {
    if (timerData.totalPassedSeconds >= timerData.targetSeconds 
        || timerData.targetSeconds == 0){
      return;
    }
    timerData.totalPassedSeconds++;
    updateDisplayTimerInfo(page);
    timerData.timerHandleID = setTimeout(countHandler, 1000);
  };

  if (timerData.isCountDown) {
    timerData.totalPassedSeconds = timerData.targetSeconds;
    timerData.timerHandler = countDownhandler;
  } else {
    timerData.totalPassedSeconds = 0;
    timerData.timerHandler = countHandler;
  }
}

function updateDisplayTimerInfo(page) {
  page.setData({
    hours: timerData.hours,
    minutes: timerData.minutes,
    seconds: timerData.seconds
  });
}

function stopTimeout(){
  if(timerData.timerHandleID){
    clearTimeout(timerData.timerHandleID);
    timerData.timerHandleID = null;
  }
}

Page({

  /**
   * Page initial data
   */
  data: {
    isCountDown: true,
    isEditingTimer: false,
    imagePath: imagePaths.none,
    hours: 0,
    minutes: 0,
    seconds: 0,
    targetSeconds: 0,

    //type 0:2 green, 1 yellow, 0 red, overtime 30s bell
    //type 1:1 green, 30s yellow, 0 red, overtime 30s bell
    timerType: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var timerData = wx.getStorageSync('timerData');
    if (timerData) {
      timerData = timerData;
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    wx.setStorageSync('timerData', timerData);
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onUpdateTimer: function () {
    timerData.targetSeconds = this.data.hours * 3600 + this.data.minutes * 60 + this.data.seconds;
    resetTimerState(this);
    this.setData({
      isEditingTimer: !this.data.isEditingTimer,
    });
  },


  onStart: function () {
    if(!timerData.timerHandleID){
      timerData.timerHandleID = setTimeout(timerData.timerHandler, 1000);
    }
  },

  onReset: function () {
    stopTimeout();
    resetTimerState(this);
    updateDisplayTimerInfo(this);
  },

  onStop: function () {
    stopTimeout();
  },

  onAppendRecord: function () {
    var app = getApp();
    app.reports.push({    
      hours: timerData.hours,
      minutes: timerData.minutes,
      seconds: timerData.seconds
    });
  },

  onChangeTimerType: function(e){
    stopTimeout();
    timerData.isCountDown = e.detail.value;
    resetTimerState(this);
    updateDisplayTimerInfo(this);
  }
});