# URL_Shortener

## Usage
Generate short URL
```
curl -X POST -H "Content-Type:application/json" http://localhost/api/v1/urls -d '{
"url": "<original_url>",
"expireAt": "2021-02-08T09:20:41Z"
}'
```
Response
```
{
"id": "<url_id>",
"shortUrl": "http://localhost/<url_id>"
}
```
Redirect URL API
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

