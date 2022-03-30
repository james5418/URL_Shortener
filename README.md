# URL_Shortener

![](https://img.shields.io/badge/Node.js-✓-green.svg)
![](https://img.shields.io/badge/Express.js-✓-blue.svg)
![](https://img.shields.io/badge/Redis-✓-red.svg)

**Yet Another URL Shortening Service**

## Usage
Generate short URL
```
curl -X POST -H "Content-Type:application/json" http://localhost:8000/api/v1/urls -d '{
"url": "<original_url>",
"expireAt": "YYYY-MM-DDTHH:mm:ssZ"
}'
```
Response
```
{
"id": "<url_id>",
"shortUrl": "http://localhost:8000/<url_id>"
}
```
Redirect to original URL
```
curl -L -X GET http://localhost/<url_id>
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


