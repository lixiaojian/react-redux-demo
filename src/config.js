/**
 * Created by xiaojianli on 2017/1/13.
 */
module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || (process.env.NODE_ENV === 'production'?8080:3000),
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3030,
    app:{
        title:'Reat Redux Book',
        description:'React Redux Book Example',
        head:{
            titleTemplate:'React Redux Book: %s',
            meta:[
                {
                    name:'description',
                    content:'React Redux Book Example'
                },
                {
                    chartset:'utf-8'
                }
            ]
        }
    }
};