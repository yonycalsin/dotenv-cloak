# Dotenv Cloak

`Dotenv Cloak` is a package that allows you to generate on file all environment variables without the value

[![CI](https://github.com/yonycalsin/dotenv-cloak/actions/workflows/integration.yml/badge.svg)](https://github.com/yonycalsin/dotenv-cloak/actions/workflows/integration.yml)
<a href="https://github.com/yonycalsin/dotenv-cloak"><img src="https://img.shields.io/spiget/stars/1000?color=brightgreen&label=Star&logo=github" /></a>
<a href="https://www.npmjs.com/dotenv-cloak" target="_blank">
<img src="https://img.shields.io/npm/v/dotenv-cloak" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/dotenv-cloak" target="_blank">
<img src="https://img.shields.io/npm/l/dotenv-cloak" alt="Package License" /></a>
<a href="https://www.npmjs.com/dotenv-cloak" target="_blank">
<img src="https://img.shields.io/npm/dm/dotenv-cloak" alt="NPM Downloads" /></a>
<a href="https://github.com/yonycalsin/dotenv-cloak"><img src="https://img.shields.io/badge/Github%20Page-dotenv.cloak-yellow?style=flat-square&logo=github" /></a>
<a href="https://github.com/yonycalsin"><img src="https://img.shields.io/badge/Author-Yony%20Calsin-blueviolet?style=flat-square&logo=appveyor" /></a>
<a href="https://twitter.com/yonycalsin" target="_blank">
<img src="https://img.shields.io/twitter/follow/yonycalsin.svg?style=social&label=Follow"></a>

## Installation

> First we will have to install, in order to use this wonderful package.

```bash
# Using npm
npm install --save dotenv-cloak@latest

# Using yarn
yarn add dotenv-cloak@latest
```

## 🌎 Usage

```bash
# Application
APP_NAME=Dotenv Cloak
APP_PORT=8080

# Database
DB_HOST=localhost
DB_PASS=admin_password
DB_USER=root
```

The processed file will be generated `.env.example`

```bash
# Application
APP_NAME=Dotenv Cloak
APP_PORT=xxxx

# Database
DB_HOST=localhost
DB_PASS=xxxxxxxxxxxxxx
DB_USER=xxxxxx
```

to generate is very easy !

```bash
dotenv-cloak --ignore APP_NAME,DB_HOST
```

## Stay in touch

- Github [@yonycalsin](https://github.com/yonycalsin)
- Twitter [@yonycalsin](https://twitter.com/yonycalsin)

## License

`dotenv-cloak` under [License MIT.](LICENSE)
