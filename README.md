# URL_Shortener
![Build](https://github.com/james5418/URL_Shortener/actions/workflows/main.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/static/v1?message=Node.js&logo=node.js&labelColor=5c5c5c&color=6DA55F&logoColor=green&label=%20&style=flate)
![Express.js](https://img.shields.io/static/v1?message=Express.js&logo=express&labelColor=5c5c5c&color=%23404d59&logoColor=%2361DAFB&label=%20&style=flate)

<!-- ![Node.js](https://img.shields.io/badge/Node.js-6DA55F?&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)
![Mocha](https://img.shields.io/badge/-Mocha-%238D6748?&logo=mocha&logoColor=white) 
![Chai](https://img.shields.io/badge/Chai-A30701?&logo=chai&logoColor=white)

![](https://img.shields.io/badge/Node.js-✓-green.svg)
![](https://img.shields.io/badge/Express.js-✓-blue.svg)
![](https://img.shields.io/badge/Redis-✓-red.svg)
![](https://img.shields.io/badge/Mocha-✓-brown.svg)
![](https://img.shields.io/badge/Chai-✓-orange.svg) -->

### Yet Another URL Shortening Service
> https://short--url.herokuapp.com

## Features

| HTTP Type | API URL      | Comments                                         |
| --------- | ------------ | ------------------------------------------------ |
| POST      | /api/v1/urls | Generate a short URL based on the given URL      |
| GET       | /<url_id>    | Redirect to original URL by <url_id>             |
| GET       | /show        | Get all short URLs and their original URLs       |

## Usage

Short URL Generation
```shell
curl -X POST -H "Content-Type:application/json" https://short--url.herokuapp.com/api/v1/urls -d '{
"url": "<original_url>",
"expireAt": "YYYY-MM-DDTHH:mm:ssZ"
}'

# Response
{
"id": "<url_id>",
"shortUrl": "https://short--url.herokuapp.com/<url_id>"
}
```

Short URL Redirection
```
curl -L -X GET https://short--url.herokuapp.com/<url_id>
```

Show URLs mapping
```
curl -L -X GET https://short--url.herokuapp.com/show
```


## Development Setup

### Redis setup
#### Connect to localhost on port 6379
- Set environment variable `REDIS_URL=redis://localhost:6379` in **.env** file
- Install Redis on Ubuntu/Debian
  - `sudo apt-get update`
  - `sudo apt-get install redis-server`
- Run `sudo service redis-server start`
#### Connect to a different host or port
- Set environment variable `REDIS_URL=redis[s]://[[username][:password]@][host][:port][/db-number]` 

### Server startup
```
npm install
```
```
npm start
```


## Workflow

### APIs
The URL Shortener works in two APIs

#### 1. Generate a short URL based on the given URL
- For incoming requests, the server will first check the legitimacy of input URLs and expired dates.
- If requests are valid, the server will generate a unique, random identifier `url_id`, assign it to the original URL, and then store them with their expired date in the database using hashes. (`url_id` is the key)
- Use [nanoid](https://github.com/ai/nanoid) to generating `url_id`.
  - Tokens generated by nanoid have 10 digits ⇒ 64^10 different URLs

#### 2. Redirect short URL to original URL
- When users send requests by short URLs, the server will look up in the database by its corresponding `url_id` to check whether that short URL exists.
- If there is an existing short URL entry in the cache and the expired date of that short URL is still valid (not expired), the server will redirect users to the original URL.
- If the short URL does not exist, the server will respond with status 404 and also record it to the cache.

> Since clients may access the server simultaneously and the expired date for the same short URL can be different, it makes sense to store many pairs of different short URLs with the same original URL in the database.


### Database &nbsp; ![Redis](https://img.shields.io/static/v1?message=Redis&logo=redis&labelColor=5c5c5c&color=%23DD0031&logoColor=white&label=%20&style=flate)

- As an in-memory database, Redis is super fast and performant, which makes the application itself faster.
- Redis key value-based database is suitable for this project, this is, saving URLs mapping.
- We can store data in Redis using hashes.
    - Small hashes are encoded in a very small space.
    - When N is small, the amortized time for HGETALL and HSET commands is still **O(1)**.
- Using a separate database like MongoDB in addition to using Redis would add more complexity and compromises latency.<br>
  Actually, apart from a caching database, Redis has since evolved into a primary database nowadays.

### Testing &nbsp; ![Mocha](https://img.shields.io/static/v1?message=Mocha&logo=mocha&labelColor=5c5c5c&color=%238D6748&logoColor=white&label=%20&style=flate) ![Chai](https://img.shields.io/static/v1?message=Chai&logo=chai&labelColor=5c5c5c&color=A30701&logoColor=white&label=%20&style=flate)

✔Examine `check_date()` function, POST API, and GET API
```
npm test
```
