/**
 * Created by xiaojianli on 2017/1/13.
 *
 * 前端服务器
 */
import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import compression from 'compression';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Provider from 'react-redux';
import {match,RouterContext} from 'react-router';
import configureStore from './utils/configureStore';
import getRouters from './routers';
import Html from './utils/Html';
import config from './config';

const app = new Express();
const prot = config.port;
const targetUrl = 'http://'+config.apiHost+':'+config.apiPort;
const proxy = httpProxy.createProxyServer({
    target: targetUrl
});
app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'ststic')));
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use('/api', (req, res) => {
    proxy.web(req, res, {target: targetUrl});
});

app.use((req,res) => {
    if(process.env.NODE_ENV !== 'production'){
        webpackIsomorphicTools.refresh();
    }
    
    const store = configureStore();
    const routers = getRouters(store);
    
    function hydrateOnClient() {
        res.send('<!doctype html>'+renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
    }
    if(__DISABLE_SSR__){
        hydrateOnClient();
        return;
    }

    match({routes,location:req.url},(err,redirect,renderProps) => {
        if(redirect){
            res.redirect(redirect.pathname+redirect.search)
        }else if(err){
            res.status(500);
            hydrateOnClient();
            console.error('ROUTER ERROR:',err.stack);
        }else if (renderProps){
            res.status(200);

            const component = (
                <Prvider store={store}>
                    <PouterContext {...renderProps} />
                </Prvider>
            )
            res.send('<!doctype html>\n'+renderToString(<Html assets={webpackIsomorphicTools.assets()} component = {component} store={store}/>))
        }else{
            res.status(404).send('Not Found');
        }
    })
});

app.listen(prot,(error) => {
    if(error){
        console.error(error);
    }else{
        console.info('==> open http://%s:%s in a brower to view the app',config.host,config.port);
    }
})