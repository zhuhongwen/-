/**
 * 编辑讲师功能
 * 1.获取地址tc_id
 * 2.根据这个tc_id发请求得到讲师的数据
 * 3.点击保存按钮，把讲师新的数据发给后端
 */
define(['jquery', 'template', 'datepicker', 'locales', 'validation', 'form'], function ($, template) {

  // 获取讲师信息并展示
  getDateShow()

  // 注册保存按钮事件，点击后发送form中的数据给后端
  // saveDate()

// $(input).datepicker()

  // 获取地址栏中的参数,返回值是地址参数的对象形式
  function getArg () {
    // 获取地址栏中的参数字符串
    var query = window.location.search  // ?a=1&b=2&c
    var arrTmp = query.split('?')  // ['','a=1&b=2&c']
    var str = ''
    str = arrTmp[1] // a=1&b=2
    var arrQuery = str.split('&') // ['a=1', 'b=2','c']
    var obj = {} // 参数都放到这个对象中
    // 遍历数组
    for (var i = 0; i < arrQuery.length; i++) {
      var item = arrQuery[i]
      var tmp = item.split('=') // [a,'1']
      // 为什么要判断 >1 ，因为如果数组中的数据长度为1的话，是获取不到arr[1]的
      obj[ tmp[0] ] = tmp[1]
    }
    return obj
  }

  // 为什么我们把代码放到一个function, 只是为了看起来清晰一些
  // 根据tc_id 获取数据，并展示
  function getDateShow () {
    var obj = getArg()  // obj.tc_id
    var options = { // ajax方法的参数
      url: '/api/teacher/edit',
      type: 'get',
      data: {
        tc_id: obj.tc_id
      },
      success: function (data) {
        // 拼接字符串，模板引擎，纯粹的dom操作, es6模板字符串 ``
        var html = template('tmpl-edit', data.result)
        $('form').html(html)
        // 日期插件初始化
        // 要保证当这个.tc-date存在时，才能执行这个方法
        $('.tc-date').datepicker({format: 'yyyy/mm/dd', language: 'zh-CN'})

        // 初始化表单验证插件，为什么我们把这个初始化的方法写在这个success函数里面?
        $('form').validate({
          submitHandler: function () {
            // 验证成功后，且我们触发了表单的提前
            // 这里默认事件已经禁止了
            var options = {
              url: '/api/teacher/update',
              type: 'post',
              data: {tc_id: getArg().tc_id},
              success: function (data) {
                if (data.code === 200) {
                  window.alert('修改成功哦!')
                }
              }
            }
            // 是表单中的数据发给后端!
            $('form').ajaxSubmit(options)
          },
          rules: {
            tc_name: {
              required: true,
              rangelength: [2, 10]
            },
            tc_join_date: {
              required: true,
              date: true
            }
          },
          messages: {
            tc_name: {
              required: '用户名不能为空',
              rangelength: '用户名长度必需是2-10， 包含2和10'
            },
            tc_join_date: {
              required: '日期不能为空',
              date: '要符合日期的格式'
            }
          }
        })
      }
    }
    $.ajax(options)
  }

  // 点击保存按钮，将编辑后的数据发给后端
  function saveDate () {
    // 注册点击事件
    // 在点击事件里，获取form中的数据，并将这个数据发给后端
    $('form').on('click', '.save', function () {
      // 获取form中的数据
      // $('input:name:')
      var obj = {}
      obj.tc_id = getArg().tc_id
      obj.tc_name = $('input[name="tc_name"]').val() // 姓名
      obj.tc_join_date = $('input[name="tc_join_date"]').val()
      obj.tc_type = $('select[name="tc_type"]').val()
      obj.tc_gender = $('input[name="tc_gender"]:checked').val()
      // console.log(name,date,type,gender)
      // 发请求
      var options = {
        url: '/api/teacher/update',
        type: 'post',
        data: obj,
        success: function (data) {
          if (data.code === 200) {
            window.alert('修改成功哦!')
          }
        }
      }
      $.ajax(options)
      // console.log(name)
    })
  }

})
