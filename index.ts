import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
const BASE = "http://www.fileformat.info/info/unicode/char/";
const app = express();
app.get("/info", async (req, res) => {
  const char = req.query.char;
  let response;
  try {
    response = await axios.get<string>(BASE + char);
  } catch (e) {
    console.error(e);
    return res.status(400).send({
      message: "Internal server error or invalid URL",
      code: errorCodeGenerator("Internal Server Error"),
    });
  }
  const $ = cheerio.load(response.data);
  let obj: Record<string, string | undefined | null> = {};
  obj.name = $("meta[name='og:title']").attr("content");
  // @ts-ignore
  obj.fullname = $("table td h1")[0].children[0].data;
  obj.url = BASE + char;
  obj.code = obj.name.match(/U\+([\dA-Fa-f]+)/)?.[1] ?? "ERR!";
  obj.char = String.fromCharCode(parseInt(obj.code, 16));
  res.send(obj);
});

function errorCodeGenerator(s: string) {
  let n = 0;
  for (const c of s.split("")) {
    n += c.charCodeAt(0);
  }
  return -n;
}

app.listen(process.env.PORT || 8080);
