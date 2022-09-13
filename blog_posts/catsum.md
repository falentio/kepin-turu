---
desc: Random CAT images
postDate: 7-5-2022
tags:
    - picsum
    - photo
    - cat
    - kucing
---

# Catsum

https://catsum.deno.dev

Catsum is random cat images generator.
Highly inspired with picsum.photo but only focused to Cat Photo.

## Catsum created using:

1. Typescript
2. Deno
3. Imgix
4. Flickr

All images are received from flickr api, and stored in single csv file so I dont need to take care of api rate limit from flickr api.
Images processing like crop, blur, grayscaling, and format converter are done by Imgix.

## Features

1. Random Cat Images
2. Crop Images
3. Grayscale
4. Blur
5. Consistent random image using seed
6. Dynamic seed

## Random Number Generator

To generate random image based on seed, I use 32bit xorshift RNG, and manipulate each char code of seed chars to initial state of RNG. Each Request will using diffrent RNG, and create new one.

Below is small 32bit xorshift I used

```ts
function xorshift(n: number) {
	n ^= n << 13;
	n ^= n >>> 17;
	n ^= n << 5;
	return n;
}
```

## Link

Visit https://catsum.falentio.my.id to see what catsum do
