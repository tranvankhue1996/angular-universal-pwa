[![Maintainability](https://api.codeclimate.com/v1/badges/feb1889ed8bd09672fae/maintainability)](https://codeclimate.com/github/maciejtreder/angular-universal-pwa/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/feb1889ed8bd09672fae/test_coverage)](https://codeclimate.com/github/maciejtreder/angular-universal-pwa/test_coverage) 
[![Build Status](https://travis-ci.org/maciejtreder/angular-universal-pwa.png)](https://travis-ci.org/maciejtreder/angular-universal-pwa)
[![Dependency Status](https://david-dm.org/maciejtreder/angular-universal-pwa.svg)](https://david-dm.org/maciejtreder/angular-universal-pwa)
[![Backers on Open Collective](https://opencollective.com/angular-universal-pwa/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/angular-universal-pwa/sponsors/badge.svg)](#sponsors)
[![npm version](https://badge.fury.io/js/angular-universal-pwa.svg)](https://badge.fury.io/js/angular-universal-pwa)

# Angular 5/6 Universal Progressive Web App - starter [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?text=Check%20out%20Angular%20Universal%20PWA%20boilerplate&url=https://github.com/maciejtreder/angular-universal-pwa&via=maciejtreder&hashtags=angular,pwa,webapp,software,developers)
![angular-universal-PWA report](https://raw.github.com/maciejtreder/angular-universal-pwa/master/application/src/assets/img/lighthouse_report.png)

### _**Star it and share with others!**_
This repo is the boilerplate for **(PWA) progressive web app** with Angular Universal (serverside rendering).
It is prepared to be easily deployed on serverless environment (Google Cloud Functions & AWS Lambda supported).

## Live demo
[Angular Universal PWA on AWS Lambda + API Gateway](https://www.angular-universal-pwa.maciejtreder.com)

## Content
 - [What's inside?](#wi)
 - [Getting started](#start)
 - [Deployment](#deploy)
 - [To do](#todo)
 - [Question, Problem, Feature Request](#question)
 - [Funding](#funding)
 - [Credentials](#credentials)




## <a name="wi"></a> What's inside?
* PWA - content is cached and available offline, it can be also installed as native app on Android devices and Google Chrome
* AMP - Accelerated Mobile Pages - super fast initial load (down to ~650ms)
* Push notifications:
    * Vapid webpush (Chrome and Firefox) - Using [aws-sns-webpush](https://github.com/maciejtreder/aws-sns-webpush) as back-end
    * Safari push - Using [aws-sns-webpush](https://github.com/maciejtreder/aws-sns-webpush) as back-end
* Server-side rendering with Angular Universal
* TransferState
* Lazy loading modules
* External modules (You can split your application into multiple projects and lazy-load them, [read more here](https://github.com/maciejtreder/angular-external-module)) [TBD after CLI merge - [#150](https://github.com/maciejtreder/angular-universal-pwa/issues/150)]
* Angular Material
* Unit tests
* Firebug Lite (great solution for development on touch-screen devices, ie: tablets)

### Used frameworks/technologies
* Angular 5.x & 6.x
* Angular CLI 1.x & 6.x
* Webpack
* Serverless framework

## <a name="start"></a> Get Started

### Using Angular CLI schematics

```bash
npm install -g angular-universal-pwa
```

Create project:
```bash
ng new --collection angular-universal-pwa myApp
cd myApp
npm start
```

#### CLI params
* `--provider` - What serverless provider you want to use? (`aws` | `gcloud` | `both`) - default `both`
* `--gaTrackingCode` - Provide your Google Analytics tracking code, to enable GA (ie `--gaTrackingCode UA-123456`)
* `--firebug` - Decide if you want to download firebug-lite (`true` | `false`) - default `false`

### Cloning the repo 
```bash
git clone https://github.com/maciejtreder/angular-universal-pwa.git
cd angular-universal-pwa/application
npm install
npm start
```

##Running modes
* Development mode (autoreload only): ```npm start```
* Development mode (autoreload + unit tests): ```npm run build:dev```
* Development mode (autoreload + firebug lite): ```npm run build:firebug```
* Development mode (autoreload + firebug lite + unit tests): ```npm run build:dev:firebug```
* Unit tests: ```npm run test```


## <a name="deploy"></a> Deployment
### Production mode with Node.JS
```sh
npm run build:prod
npm run server
```
### Serverless environments
#### AWS Lambda

```bash
ng new --collection angular-universal-pwa myApp
npm run build:deploy:aws
```
or (since 2.0.0-beta.4)
```bash
ng new --collection angular-universal-pwa myApp --provider aws
npm run build:deploy
```

#### Google Cloud Functions

```bash
ng new --collection angular-universal-pwa myApp
npm run build:deploy:gcloud
```
or (since 2.0.0-beta.4)
```bash
ng new --collection angular-universal-pwa myApp--provider gcloud 
npm run build:deploy
```

## <a name="todo"></a> To do
* prerender app for 'no-backend' hosting
* microservices support - make replacement eligible external module without recompiling whole app
* [ng-http-sw-proxy (all requests done offline, are synced when app comes back online)](https://github.com/maciejtreder/ng-http-sw-proxy) - not working since Angular 5.x (more info can be found in [this issue](https://github.com/webmaxru/pwatter/issues/2))
* e2e tests


## Won't implement:
* load static content from S3 (JavaScript, styles, images):
    * when serving all static content from S3 load speed up is not really visible (increase is around ~0,2 sec),
    * problems with CORS on Chrome,
    * problems with compression of some files (.js files are not compressed in some cases)
    * needs a lot of manual setup (cloudfront setup etc.)


## <a name="question"></a> Looking for something more?
Feel free to [create issue with your feature request](https://github.com/maciejtreder/angular-universal-pwa/issues/new)


## <a name="funding"></a> Funding

You can support development of this project via
[Open Collective](https://opencollective.com/angular-universal-pwa),
[Donorbox](https://donorbox.org/angular-universal-pwa),
[Liberapay](https://liberapay.com/maciejtreder/donate),



### Open Collective Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/angular-universal-pwa#backer)]

<a href="https://opencollective.com/angular-universal-pwa#backers" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/backers.svg?width=890"></a>


### Open Collective Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/angular-universal-pwa#sponsor)]

<a href="https://opencollective.com/angular-universal-pwa/sponsor/0/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/1/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/2/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/3/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/4/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/5/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/6/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/7/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/8/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/angular-universal-pwa/sponsor/9/website" target="_blank"><img src="https://opencollective.com/angular-universal-pwa/sponsor/9/avatar.svg"></a>



## <a name="credentials"></a> Credentials
* Checkout my [home page](https://www.maciejtreder.com) and find out more about me
* Inspired by [ng-universal-demo](https://github.com/FrozenPandaz/ng-universal-demo)



