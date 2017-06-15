define(['jquery', 'validation', 'form'], function ($) {
  $.validator.addMethod('confirm', function () {
    // 判断确认密码与，密码是否一致，如果一致返回true ,表明通过验证
    // 如何不不相等返回 false
    var newPass = $('input[name="tc_new_pass"]').val()
    var confirmPass = $('input[name="tc_confirm_pass"]').val()
    return newPass === confirmPass
  }, '提示！')
   // 初始化表单验证插件
  $('form').validate({
    // 写了这个方法之后，默认的提交事件会被禁止
    submitHandler: function () {
      // window.alert(123)
      $('form').ajaxSubmit({
        url: '/api/teacher/repass',
        type: 'post',
        // data
        success: function (data) {
          if (data.code === 200) {
            window.alert('修改成功!')
          }
        }
      })
    },
    //
    rules: {
      tc_pass: {
        required: true
      },
      tc_new_pass: {
        required: true
      },
      tc_confirm_pass: {
        required: true,
        confirm: true
      }
    },
    messages: {
      tc_pass: {
        required: '原密码不能为空'
      },
      tc_new_pass: {
        required: '新密码不能为容'
      }
    }
  })
})
