# URL_Shortener

**Yet Another URL Shortening Service**

### Tech Stack
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)
![Mocha](https://img.shields.io/badge/-Mocha-%238D6748?&logo=mocha&logoColor=white) 
![Chai](https://img.shields.io/badge/Chai-A30701?&logo=chai&logoColor=white)

<!-- ![](https://img.shields.io/badge/Node.js-✓-green.svg)
![](https://img.shields.io/badge/Express.js-✓-blue.svg)
![](https://img.shields.io/badge/Redis-✓-red.svg) -->

### Features
| HTTP Type | API URL      | Comments                                         |
| --------- | ------------ | ------------------------------------------------ |
| POST      | /api/v1/urls | Shorten a given url                              |
| GET       | /<url_id>    | Redirect to original url by <url_id>             |
| GET       | /show        | Get all short urls and their original urls |

## Usage

Short URL Generation
```shell
curl -X POST -H "Content-Type:application/json" http://localhost:8000/api/v1/urls -d '{
"url": "<original_url>",
"expireAt": "YYYY-MM-DDTHH:mm:ssZ"
}'
```

> Response
```json
{
"id": "<url_id>",
"shortUrl": "http://localhost:8000/<url_id>"
}
```

Short URL Redirection
```
curl -L -X GET http://localhost:8000/<url_id>
```

Show URLs mapping
```
curl -L -X GET http://localhost:8000/show
```


## Getting Started

#### Get project dependencies
```
npm install
```
#### Run server
```
npm start
```
#### Redis startup
```
sudo service redis-server start
```
#### Unit Test 
```
npm test
```

## Work Flow



