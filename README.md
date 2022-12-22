# Tokopedia Simple Scraper

**Tokopedia Simple Scraper** is a project to provide products data of Tokopedia when doing search such as Product Name, Image, Price, Star, Sold, and etc..

## Usage

To run the script:

```shell
npm run scrape:tokopedia-search -- --productSearch=[product_name_or_keyword]
```

Example:

```shell
npm run scrape:tokopedia-search -- --productSearch="sepatu compass"
```

Result:
```json
[
 {
    "title": "sepatu Compass Gazelle Low Black White",
    "shopName": "Elsyz ID",
    "price": "Rp429.999",
    "img": "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2022/10/17/3c26e6e4-be8a-4af0-acbd-652d275cf25d.jpg",
    "star": "4.9",
    "sold": "Terjual 500+"
  },
  {
    "title": "Sepatu Compass Gazelle High Black White",
    "shopName": "Elsyz ID",
    "price": "Rp499.999",
    "img": "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2022/10/17/350e2748-9fdd-455a-891d-10614c63e4dd.jpg",
    "star": "4.9",
    "sold": "Terjual 100+"
  },
]
```

## Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)