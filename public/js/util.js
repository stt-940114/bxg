/**
 * Created by Administrator on 2017/3/20 0020.
 */
define(["jquery"],function ($) {

 return {
     setMenu:function (pathname) {
         // $('.navs a[href="'+pathname+'"]').addClass('active');

         $(".navs a[href='"+pathname+"']").addClass("active");
         // $(".navs a[href='+pathname+']").addClass("active");
     }
 }


});