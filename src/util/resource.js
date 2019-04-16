// 上帝保佑,永无bug

import axios from 'axios'
import createHashHistory from 'history/createHashHistory';
import {TOKEN} from 'store'


/*
 *   封装axios get, post, delete, put 方法, 可配置是否有缓冲
 * */
var resource = {
    count: 0,
    timer: null,
    isOpen: true,
    width: 0,                  // 顶部加载进度条宽度
    post: function (uri, params, isLoading) {
        return this.send(uri, params, 'post', isLoading);
    },
    handleUrl: function(url){
        var newUrl = ''
        var newParama = `&locale=${sessionStorage.getItem('locale') ? 
            (sessionStorage.getItem('locale')  === "zh-CN"?"zh-CN":"en-US" )
            : "zh-CN"}`
        if(url.indexOf('?') >= 0){
            newUrl = newParama;
        }else{
            newUrl = '?'+ newParama
        }
        return newUrl
    },
    // 删除数据
    delete: function (uri, isLoading) {
        return this.send(uri, null, 'delete', isLoading);
    },

    // 更新数据
    put: function (uri, params, isLoading) {
        return this.send(uri, params, 'put', isLoading);
    },

    // 获取数据
    get: function (uri, isLoading) {
        return this.send(uri, null, 'get', isLoading);
    },
    open: function () {
        // this.isOpen = true;
    },
    close: function () {
        // this.isOpen = false;
    },

    send: function (uri, params, method) {

        const promise = new Promise((resolve, reject) => {
            switch (method) {
                case 'post':
                    axios.post(uri, params).then((res) => {
                        resolve(res.data);
                    });
                    break;
                case 'delete':
                    axios.delete(uri).then((res) => {
                        resolve(res.data);
                    });
                    break;
                case 'put':
                    axios.put(uri, params).then((res) => {
                        resolve(res.data);
                    });
                    break;
                case 'get':
                    axios.get(uri).then((res) => {
                        resolve(res.data);
                    });
                    break;
            }
        });
        return promise;
    }
};

// axios.defaults.baseURL = 'http://192.168.1.169:7087';

// 请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config)
    config.headers.token = sessionStorage.getItem(TOKEN)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    switch (response.data.status) {
        case 401:
            sessionStorage.removeItem(TOKEN);
            createHashHistory().push('/login')
            break;
        case 500:
            //Notice.error(response.data.message)
            break;
    }
    return response;
}, function (error) {
    if(error.response && error.response.data.status == 401 || error.response && error.response.data.status === 403){
        //sessionStorage.removeItem(TOKEN);
        //createHashHistory().push('/login');
    }
    if (resource.timer) {
        resource.isStop(true);
    }
    return Promise.reject(error);
});

export default resource;
