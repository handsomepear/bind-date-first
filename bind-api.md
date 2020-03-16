# 接口文档
## 公共定义
- 所有接口都应有token，不含token视为未登录，token在登录接口返回
- 所有接口皆为post类型，request/response皆为json对象
## 登录 /jssdk/config
```
request:
{
    "url": ""
}
response:
{
    "errCode": 0,
    "errMessage": "",
    "data": {
        "signature": "22d174ce7bcdadff87e166d9e4e2774f8570b88e",
        "nonceStr": "22529997ea8a4320be299e7ae9116dc6",
        "timestamp": "1583420272"
    }
}
```
## 获取上传信息 /getUploadInfo
```
request:
{
    "mimeType": "pic",
    "suffixes": "jpg",
    "keys": ""
}
response:
{
    "errCode": 0,
    "errMessage": "",
    "mimeType": "pic",
    "uploadInfoList": [
        {
            "token": "Kii9JQURkh6Cj4JIlmXU2PmzJWo3zhZl2D9bZc7v:E7pWqa8NRCu4_JgsxZCCbKsc5ak=:eyJzY29wZSI6Im1ycjpwaWMvbXJyLzIwMDMxNS8yMjM1L2FkZjJkZTkxZGZhZDRkODAuanBnIiwiZGVhZGxpbmUiOjE1ODQyODY1Mjh9",
            "host": "http://q78n6p270.bkt.clouddn.com/",
            "key": "pic/mrr/200315/2235/adf2de91dfad4d80.jpg",
            "finalUrl": "http://q78n6p270.bkt.clouddn.com/pic/mrr/200315/2235/adf2de91dfad4d80.jpg"
        }
    ]
}
```
## 登录 /login
```
request:
{
    "code": "vsdfvadfv",//微信授权拿到的code
    "proxyId":1//代理id
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": "",//errCode不为0时,说明失败原因
    "token": "",
    "user":{
        "id":1, 
        "nickName":"1", 
        "headUrl":"1", 
        "sex":1 1:男 2:女         
    }
}
```
## 创建帖子 /post/add
```
request:
{
    "token": "vsdfvadfv",
    "post":{
        "sex": 1,//1：男 2：女
        "name": "张三",
        "birth": "2000",
        "province": "河北",
        "city": "石家庄",
        "workProvince": "北京",
        "workCity": "北京",
        "occupation": "产品经理",
        "educational": "本科",
        "standard": "择偶标砖",
        "vx": "13812345678",//本人微信
        "parentVx": "13812345678",//家长微信
        "imgs":["http://...","http://..."]
    }
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": ""//errCode不为0时,说明失败原因
}
```
## 帖子列表 /post/list
```
request:
{
    "token": "vsdfvadfv",
    "locType": 1, 1:家乡 2：工作地
    "province": "河北",
    "city": "石家庄",
    "sex": 1,//1：男 2：女
    "pageSize":1,
    "pageRecord": ""//第一页传空串,后续传上一页返回的nextPageRecord
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": "",//errCode不为0时,说明失败原因
    "nextPageRecord":"",
    "list":[
        {
            "id": 1,
            "userId": 2,
            "age":10,
            "publishTime": "刚刚",
            "hasBuy":true,
            ...创建帖子request中post的所有参数
        }
    ]
}
```
## 帖子详情 /post/detail
```
request:
{
    "token": "vsdfvadfv",
    "id":1
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": ""//errCode不为0时,说明失败原因
    "post":{
        ...帖子列表response中list元素的所有信息
    }
}
```
## 帖子删除 /post/delete
```
request:
{
    "token": "vsdfvadfv",
    "postId":1
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": "",//errCode不为0时,说明失败原因
}
```
## 帖子举报 /post/accuse
```
request:
{
    "token": "vsdfvadfv",
    "postId":1,
    "reason":"举报原因",
    "tel":"举报电话"
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": "",//errCode不为0时,说明失败原因
}
```
## 帖子购买 /post/buy
```
request:
{
    "token": "vsdfvadfv",
    "postId":1
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": "",//errCode不为0时,说明失败原因
    "orderId":1,
    "appId":"",
    "nonceStr":"",
    "prepayId":"",
    "timeStamp":"",
    "paySign":""
}
```
## 个人主页 /homepage
```
request:
{
    "token": "vsdfvadfv"
}
response:
{
    "errCode": 0,//0:正常 其他：异常
    "errMessage": "",//errCode不为0时,说明失败原因
    "info":{
        "id":1, 
        "nickName":"1", 
        "headUrl":"1"        
    },
    "mineList":[
        {
            "id": 1,
            "userId": 2,
            "age":10,
            "publishTime": "刚刚",
            "hasBuy":true,
            ...创建帖子request中post的所有参数
        }
    ],
    "buyList":[
        {
            "id": 1,
            "userId": 2,
            "age":10,
            "publishTime": "刚刚",
            "hasBuy":true,
            ...创建帖子request中post的所有参数
        }
    ],
}
```