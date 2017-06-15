/**
 * 把require的配置统一写在这里
 */
require.config({
  baseUrl: '/node_modules',
  paths: {
    jquery: 'jquery/dist/jquery',
    cookie: 'jquery.cookie/jquery.cookie',
    nprogress: 'nprogress/nprogress',
    template: 'art-template/lib/template-web',
    bootstrap: 'bootstrap/dist/js/bootstrap', // 先配置别名
    // 日期插件
    datepicker: 'bootstrap-datepicker/dist/js/bootstrap-datepicker',
    locales: 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
    validation: 'jquery-validation/dist/jquery.validate',
    form: 'jquery-form/dist/jquery.form.min'
    // form: 'jquery-form/'
  },
  shim: {
    // 告诉requirejs bootstrap依赖于谁
    bootstrap: {
      // depend 依赖的意思
      deps: ['jquery']
    },
    locales: {
      deps: ['jquery', 'datepicker']
    }
  }
})
