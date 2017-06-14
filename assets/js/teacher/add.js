/**
 * 添加讲师
 * 1.注册添加按钮的点击事件
 * 2.在事件里，获取form中数据
 * 3.把数据发给后端
 */
define(['jquery', 'datepicker'], function ($) {
  $('input[name="tc_join_date"]').datepicker({format: 'yyyy/mm/dd'})
  // 1.注册添加按钮点击事件
  $('.tc-add').on('click', function () {
    // 其实在发请求之前，应该判断一下数据是否符合要求
    // 可以用与正则判断,可以直接字符串if判断
    // 有一个插件 jquery 的 validate,专门用来做表单验证的  
    var obj = {}
    obj.tc_name = $('input[name="tc_name"]').val() // 姓名
    obj.tc_join_date = $('input[name="tc_join_date"]').val()
    obj.tc_type = $('select[name="tc_type"]').val()
    obj.tc_gender = $('input[name="tc_gender"]:checked').val()
    obj.tc_pass = $('input[name="tc_pass"]').val()
    // 发请求
    var options = {
      url: '/api/teacher/add',
      type: 'post',
      data: obj,
      success: function (data) {
        console.log(data)
        // 成功之后，应该清空form中的数据
        // reset, form原生对象的方法，用于将form中的数据清空
        $('form')[0].reset()
      }
    }
    $.ajax(options)
  })
})

