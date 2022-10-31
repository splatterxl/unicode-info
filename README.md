# Unicode Info

Runs as a HTTP server that proxies requests to https://fileformat.info and scrapes the HTML output of that.

## Installation

```sh
# clone the repository
git clone git@github.com:splatterxl/unicode-info
cd unicode-info

# install dependencies
npm install --global typescript
npm install

# build the program
tsc .
```

## Usage

The app registers an HTTP server that you can query, to get it running just run the compiled file `index.js`:

```sh
PORT=8080 node ./index.js
```

Then, to query information about a character send a `GET` request to `/info?char={hex_code_point}`, where `hex_code_point` is the Unicode code point of the character encoded in hexadecimal.

For example, to get information about the line feed character `\n`:

```js
const charCode = '\n'.charCodeAt(0).toString(16);

fetch(`http://localhost:8080/info?char=${charCode}`).then(res => res.json()).then(console.log)
```
