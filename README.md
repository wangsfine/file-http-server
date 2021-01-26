# simple-http-server
a simple http server, created by local file system
# 使用示例
1. npx
```
    cd /home/xxx/test
    npx simple-http-server --port=3000
```
2. npm 全局安装后使用siple-http-server命令

```
    cd /home/xxx/test
    npm install simple-http-server -g
    simple-http-server --port=3000
```
# 配置说明
1. port：启动服务的端口，默认8000
2. proxy: 指定代理配置，如果配置后，则服务所有请求将转发到代理服务器上，使用示例：
```
    simple-http-server --port=3000 --proxy=http://192.168.56.100
```