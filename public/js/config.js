require.config({
    baseUrl:"/public",
    paths:{

        jquery:"assets/jquery/jquery.min",
        cookie:"assets/jquery-cookie/jquery.cookie",
        echarts:"assets/echarts/echarts.min",
        template:"assets/artTemplate/template",
        bootstrap:"assets/bootstrap/js/bootstrap"
    },
    shim:{
        bootstrap:{
            //把bootstrap转换为标准的模块，依赖于jquery
            deps:["jquery"]
        }
    }
})