# Turning On/Off Computer with Google Assistant

Author: Kyungrae Kim

----

This is a personal project that uses [If This Then That](https://ifttt.com/) to create applets that turn on and off computer with Google Assistant.

----

## Turning Off Computer

Status: Complete

Follow [these](https://github.com/MaxAnderson95/Shutdown-PC-via-IFTTT) directions to enable turn off a computer with Google Assistant.

----

## Turning On Computer

Status: Checkout the completed project using Flask [here](https://github.com/jeremymaya/raspberry-pi-os/tree/master/flask_app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/faaf2e0f-145d-4f6b-8f2a-a4a8a5d5303b/deploy-status)](https://app.netlify.com/sites/stoic-goldstine-9c5a07/deploys)

Turning on computer requires to use Wake-on-LAN. WOL works by broadcasting a magic packet to the network and powers on a specific device.

There are npm packages available to use. For this project, I am using [wake-on-lan](https://www.npmjs.com/package/wol) npm package.

Currently, the project uses the following,

* IFTTT Google Assistant Simple Phrase trigger
* IFTTT Webhook to make a POST request
* AWS Lambda function on Netlify

POST endpoint accepts the following JSON object

```json
{"macAddress": "XX-XX-XX-XX-XX-XX"}
```

The current setup broadcasts the magic packet in the wrong network since the server is located in a remote location. I am looking into using the GET method to trigger WOL from the local network.

----

## Credits

* [Shutdown PC via IFTTT](https://github.com/MaxAnderson95/Shutdown-PC-via-IFTTT)
* [Netlify Documentation - Functions](https://docs.netlify.com/functions/build-with-javascript/)
* [Super simple start to serverless](https://kentcdodds.com/blog/super-simple-start-to-serverless)
* [Write and Deploy Your First Serverless Function in 10 Minutes, or Less](https://codeburst.io/write-and-deploy-your-first-serverless-function-within-10-minutes-or-less-d7552fcd6550)
