/**
 * list.js
 * 1.数据列表的展示
 * 2.启用注销讲师账号
 */
define(['bootstrap', 'jquery', 'template'], function (x, $, template) {
  // 1.发请求获取讲师列表
  //  1.1.获取到信息之后用模板引擎来呈现数据
  // http://api.botue.com/teacher
  // 定义一个过滤器getAge,根据生日计算出年龄
  template.defaults.imports.getAge = function (value) {
    var birthYear = new Date(value).getFullYear()
    var nowYear = new Date().getFullYear()
    return nowYear - birthYear
  }

  // 只要是发ajax请求，要看接口文档
  var options = {
    // http://api.botue.com/teacher
    url: '/api/teacher',
    success: function (data) {
      if (data.code === 200) {
        // 呈现数据!用模板模板引擎
        var result = template('tmpl-list', {list: data.result})
        $('#list').html(result)
      }
    }
  }
  // var ￥ = $
  $.ajax(options)


  // 2.点击查看按钮，弹出模态框
  // 2.1 注册点击事件
  // 事件委托
  // 给父元素注册事件, 在父元素的事件里判断是哪个子元素触发
  $('#list').on('click', '.showmodal', function () {
    // $(模态框选择器).modal() // 弹出模态框
    // boostrap的模态框
    // window.alert(123)
    // 2.2 在事件里调用js弹出模态框
    $('#teacherModal').modal() // bootstrap会把#teacherModal这个元素显示出来

    // 2.3 发请求获取讲师的详细数据
    var tc_id = $(this).closest('tr').attr('tc-id') // 获取讲师的id
    var options = {/**/
      // http://api.botue.com/teacher/view
      url: '/api/teacher/view',
      type: 'get',
      data: {tc_id: tc_id},
      success: function (data) {
        if (data.code === 200) {
          // 通过模板引擎把数据呈现上去
          var obj = data.result
          // es6模板字符串
          // 反引号
          var str = ` 
          <tr>
                  <th>姓名:</th>
                                <td>天下二</td>
                                <th>职位:</th>
                                <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                    <div class="avatar">
                                        <img src="${obj.tc_avatar}" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>花名:</th>
                                <td>${obj.tc_roster}</td>
                                <th>出生日期:</th>
                                <td colspan="3">${obj.tc_birthday}</td>
                            </tr>
                            <tr>
                                <th>性别:</th>
                                <td>${obj.tc_gender === '1' ? '女' : '男'}</td>
                                <th>入职日期:</th>
                                <td colspan="3">${obj.tc_join_date}</td>
                            </tr>
                            <tr>
                                <th>手机号码:</th>
                                <td colspan="2">13051524959</td>
                                <th>邮箱:</th>
                                <td colspan="2">zhaoyuchuan@itcast.cn</td>
                            </tr>
                            <tr>
                                <th>籍贯:</th>
                                <td colspan="6">河北省 保定市 曲阳县</td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <div class="introduce">
                                    ${obj.tc_introduce}
                                        </div>
                                </td>
            </tr>`
         // 把str插入到dom中
         // 呈现数据
         // .html(), .text('<div></div>)
         $('#modal-list').html(str)
        }
      }
    }
    $.ajax(options)
  })

  // 3.注销功能
  // 点击按钮，发请求，请求回来之后要按钮中的文字
  // 点击按钮，发请求修改讲师的状态，修改后要改变按钮的值: 注销或者启用
  // tc_status值为 1 按钮是启用
  // parents（div）
  // closest(div)
  // <div> <div> <div> button <div></div></div>
  $('#list').on('click', '.logout', function () {
    // $().parents().children().first().next()
    var $this = $(this)
    var tc_id = $this.closest('tr').attr('tc-id') // 获取讲师的id
    var $tr = $this.closest('tr')
    var tc_status = $tr.attr('tc-status')// 讲师的状态
    var zxOptions = {
      url: '/api/teacher/handle',
      type: 'post',
      data: {
        tc_id: tc_id,
        tc_status: tc_status
      },
      success: function (data) {
        if (data.code === 200) {
          // 点击注销, 点击启用
          // 如果点击的注销
          var str = ''
          // if (data.result.tc_status === 1) {
          //   str = '启用'
          // } else {
          //   str = '注销'
          // }
          str = data.result.tc_status === 1 ? '启用' : '注销'
          $this.html(str)
          // 要把tc-status这个属性值修改下
          $tr.attr('tc-status', data.result.tc_status)
        }
      }
    }
    $.ajax(zxOptions)
  })
})
