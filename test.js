// See the browserless docs for more info:
// https://docs.browserless.io/
const puppeteer = require('puppeteer-core')
const request = require('request')

const api_key = "8caea8c1-c703-41e7-b854-02acba64f785"
async function scrape(){
const browser = await puppeteer.connect({ 
  browserWSEndpoint: `wss://chrome.browserless.io?token=${api_key}`
})
const page = await browser.newPage()
 await page.setViewport({ width: 1920, height: 1080 })


  const username = "james@moneytax.com"
  const password = "PAS!@#$%^AAc!"

  console.log('go to brokerengine')
  await page.goto('https://app.brokerengine.com.au', { waitUntil: 'networkidle0'})
  await page.type('input[name="username"]', username)
  await page.type('input[name="password"]', password)
  await page.click('button[type="submit"]')

  console.log('wait for page')
  await page.waitForNavigation({ waitUntil: 'load' })

  const cookies = await page.cookies()
  var cookie_str = ""
  var csrftoken = ""
  cookies.forEach(cookie => {
    var key = cookie.name
    var value = cookie.value
    if (key == "csrftoken") csrftoken = value
    cookie_str += key+ '='+ value +';' + ' '
  })

  var headers = {}
  headers['accept'] = "application/json"
  headers["accept-language"] = "en-US,en;q=0.9"
  headers["content-type"] = "application/json"
  headers["sec-ch-ua"] = "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\""
  headers["sec-ch-ua-mobile"] = "?0"
  headers["sec-ch-ua-platform"] = "\"Windows\""
  headers["sec-fetch-dest"] = "empty"
  headers["x-requested-with"] ="XMLHttpRequest"
  headers["cookie"] = cookie_str
  headers["sec-fetch-mode"] = "cors"
  headers["sec-fetch-site"] = "same-origin"
  headers["x-csrftoken"] = csrftoken
  headers["Referer"] = "https://app.brokerengine.com.au/applications/926554/activity/"
  headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

  const enterText = "NEW testdfdfde"
  request.patch({
    headers: headers,
    url:     'https://app.brokerengine.com.au/rad-api/be_core.loanapplication/926554/',
    body: "{\"customText2\":\""+enterText+"\"}"
  }, function(error, response, body){
  });
  console.log('Finished')
  

await browser.close();
}

scrape()