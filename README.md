# URL_Shortener

![](https://img.shields.io/badge/Node.js-✓-green.svg)
![](https://img.shields.io/badge/Express.js-✓-blue.svg)
![](https://img.shields.io/badge/Redis-✓-red.svg)

**Yet Another URL Shortening Service**

## Usage
| HTTP Type | API URL      | Comments                                         |
| --------- | ------------ | ------------------------------------------------ |
| POST      | /api/v1/urls | Shorten a given url                              |
| GET       | /<url_id>    | Redirect to original url by <url_id>             |
| GET       | /show        | Get all short urls and their their original urls |

### Examples

Generate short URL
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

Redirect to original URL
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



