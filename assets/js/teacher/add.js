/**
 * 添加讲师
 * 1.注册添加按钮的点击事件
 * 2.在事件里，获取form中数据
 * 3.把数据发给后端
 */
define(['jquery', 'datepicker', 'locales', 'validation', 'form'], function ($) {
   // 初始化表单验证插件
  $('form').validate({
    // invalidHandler: function () {
    //   console.log('验证不通过时执行')
    // },
    submitHandler: function () {
      //  submitForm是 jquery-form插件提供,
      // 它里面对ajax进行了封装, 会自动获取表单的中数据
      // submitForm不是异步

      $('form').ajaxSubmit({
        url: '/api/teacher/add',
        type: 'post',
        // data: {xxxxx: 'hello'}, 可以使用data, 添加的data中的数据也会被发给后端
        success: function (data) {
          $('form')[0].reset()
        }
      })
    },
    rules: {
      tc_name: {
        required: true,
        minlength: 4,
        maxlength: 10
      },
      tc_pass: {
        required: true,
        rangelength: [5, 10] // 长度需要在5到10之间
      },
      tc_join_date: {
        required: true,
        date: true
      }
    },
    messages: {
      tc_name: {
        required: '用户名不能为空',
        minlength: '长度不能小于4',
        maxlength: '长度不能大于10'
      },
      tc_join_date: {
        required: '日期不能为空',
        date: '必需是日期的格式'
      },
      tc_pass: {
        required: '不能为空',
        rangelength: '长度是5-10之间'
      }
    }
  })
  $('input[name="tc_join_date"]').datepicker({format: 'yyyy/mm/dd', language: 'zh-CN'})
  // // 1.注册添加按钮点击事件
  // $('.tc-add').on('click', function () {
  //   // 其实在发请求之前，应该判断一下数据是否符合要求
  //   // 可以用与正则判断,可以直接字符串if判断
  //   // 有一个插件 jquery 的 validate,专门用来做表单验证的
  //   var obj = {}
  //   obj.tc_name = $('input[name="tc_name"]').val() // 姓名
  //   obj.tc_join_date = $('input[name="tc_join_date"]').val()
  //   obj.tc_type = $('select[name="tc_type"]').val()
  //   obj.tc_gender = $('input[name="tc_gender"]:checked').val()
  //   obj.tc_pass = $('input[name="tc_pass"]').val()
  //   // 发请求
  //   var options = {
  //     url: '/api/teacher/add',
  //     type: 'post',
  //     data: obj,
  //     success: function (data) {
  //       console.log(data)
  //       // 成功之后，应该清空form中的数据
  //       // reset, form原生对象的方法，用于将form中的数据清空
  //       $('form')[0].reset()
  //     }
  //   }
  //   $.ajax(options)
  // })
})

