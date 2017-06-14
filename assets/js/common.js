/**
 * 多个页面共用使用到的js代码，都写到这个文件中
 * 1. 获取用户头像，名字，展示出来
 * 2. 导航菜单的状态切换，展示与收起
 * 3. 要检测用户的登陆状态，如果没有登陆，则跳转到登陆页面
 * 4. 退出登陆的功能
 * 5. 进度条功能
 */
// 先记住，用define包裹一下
// 由cookie插件是把方法放到了$上,所以也要引入一下jquery

// 页面加载后，关闭进度条
define(['cookie', 'jquery', 'nprogress'], function (x, $, NProgress) {
  // 展示进度条
  NProgress.start()
  // 赋值之前，onload事件可以已经触发了
  // window.onload = function () {
  // }

  // 通过jquery的Ajax的全局事件,来给每一次ajax请求添加进度条
  // 应该在所有ajax请求开始之前执行Nprogress.start()
  // 应该在所有ajax请求结束之后执行Nprogress.done()
  $(document).ajaxStart(function () {
    NProgress.start()  // xhr.send, xhr.onreadstatechange
  })
  $(document).ajaxStop(function () {
    NProgress.done()
  })

  // 3. 要检测用户的登陆状态，如果没有登陆，则跳转到登陆页面
  // 3.1 要判断用户有没有登陆
  var sessionId = $.cookie('PHPSESSID')
  // if (sessionId === undefined) {
  if (!sessionId) {   // !undefined 是 true
    // 3.2跳转
    window.location.href = '/views/index/login.html'
    return
  }
  // 1.获取cookie中的用户头像和名字
  // 如果$.cookie('userinfo')不存在，则传递给parse方法的参数是'{}'
  var cookieObj = JSON.parse($.cookie('userinfo') || '{}')
  console.log(cookieObj)
  $('.profile img').attr('src', cookieObj.tc_avatar)
  $('.profile h4').text(cookieObj.tc_name)

  // 2.导航菜单的状态切换，展示与收起
  // hide,slide
  // 2.1 给要点击的元素注册点击事件
  $('.navs > ul > li > a').on('click', function () {
    // 2.2 在事件的回调函数里面，要展开或者隐藏a标签下的ul
    $(this).next('ul').slideToggle()
  })

  // parents  closest
  /*<div class="box">
    <p class="box">
      a.parents('.box') 获取到的是两个box
      a.closest('.box') 获取到的是一个box 是 这个p
    </p>
  </div>*/

  // 4. 退出登陆的功能
  // 4.1 给退出按钮注册点击事件
  // $('.header .fa-sign-out').closest('a').on('click', function () {
  //   // window.alert(2)
  //   // 4.2 在事件里，要删除PHPSESSID
  //   // var dt = new Date()
  //   // $.cookie('PHPSESSID', 'dd', {expires: dt})
  //   var date = new Date()
  //   date.setTime(date.getTime()) // 只能这么写，10表示10秒钟
  //   $.cookie('PHPSESSID', 'ff', {expires: date, path: '/'})
  //   window.location.href = '/views/index/login.html'
  // })
  // 4.3 删除之后，跳转琶登陆页面

  // 用发请求的方式来实现退出登陆
  $('.header .fa-sign-out').closest('a').on('click', function () {
    var options = {
      // http://api.botue.com/logout
      // www.baidu.com
      // map.baidu.com
      url: '/api/logout',      //  /api  http:/api.botue.com
      type: 'post',
      success: function (data) {
        // obj == null
        if (data.code == 200) {
          window.location.href = '/views/index/login.html'
        }
      }
    }
    $.ajax(options)
  })
  // 结束进度条
  NProgress.done()
})
// 1.引包
// 2.配置
// 3.引入入口
// 4.其他的js都加上define


// https://stackoverflow.com/ 程序问答网站

