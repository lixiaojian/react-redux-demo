/**
 * Created by xiaojianli on 2017/1/13.
 * api的启动文件
 */

if(process.env.NODE_ENV === 'production'){
    require('../build/api/api')
}else{
    require('babel-register');
    require('../src/api/api');
}
