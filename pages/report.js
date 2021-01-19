// pages/report.js
Page({

  /**
   * Page initial data
   */
  data: {
    reports: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var reports = wx.getStorageSync('reports');
    if (reports) {
      this.setData({
        reports: app.reports
      });
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
    var app = getApp();
    if (app.reports.length > 0) {
      this.setData({
        reports: app.reports
      });
    }
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
    wx.setStorageSync('reports', this.data.reports);
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

  onDelete: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index > 0) {
     this.data.reports.splice(index - 1, 1);
      this.setData({
        reports: this.data.reports
      });
    }
  },

  onReset: function () {
    var app = getApp();
    app.reports.splice(0, app.reports.length); 
    this.setData({
      reports: app.reports
    });
  }
})