# 介绍

博客以 <a href="http://notes.iissnan.com" target="_blank">Hexo Next主题</a> 为样式基础，采用 ```Node.js``` + ```Express``` + ```MongoDB``` + ```AngularJS``` + ```Compass``` 等技术进行开发，后端API采用 ```RestfulAPI``` 的方式进行组织，代码高亮采用 ```highlight.js```，Markdown文件解析采用以 ```chjj/marked``` 库为基础进行二次开发的库以满足个人需求。

# 部署环境

1. 准备一台可以访问互联网的 ```Linux``` 服务器
1. 安装 ```Nodejs``` + ```MongoDB``` 服务器环境
1. 安装 ```ruby```
1. 安装前端依赖管理工具 ```bower```
1. 安装 ```Git```
1. 从GitHub克隆代码到本地 ```git clone https://github.com/hetianqi/blog.git```
1. ```cd``` 进入项目目录，```npm install --production``` 安装生产环境依赖包
1. ```bower install``` 安装前端依赖包
1. ```gem install compass``` 安装compass
1. 如果有必要，修改 ./server/lib/config.js 文件中的 ```MongoDB``` 账户密码和服务器端口
1. ```gulp``` 运行编译任务并启动服务即可在浏览器中访问网页