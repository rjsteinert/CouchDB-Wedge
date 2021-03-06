var axios = require('axios')
const sleep = (milliseconds) => new Promise((res) => setTimeout(() => res(true), milliseconds))


// Using console.log instead of process.stdout.write to get a line-break after each output.
// http://stackoverflow.com/a/4984464

async function timeoutSafeGet(URL) {
  async function get(URL) {
    try {
      return await axios.get(URL)
    } catch(error) {
      return false
    }
  }
  let response = false
  while(response === false) {
    response = await get(URL)
    if (response === false) {
      await sleep(5*1000)
    }
  }
  return response
}

module.exports = async function(options, callback) {
  const response = await axios.get(options.target + '/_all_dbs')
  for (const db of response.data) {
    const response = await axios.get(options.target + '/' + db + '/_all_docs?startkey="_design/"&endkey="_design0"&include_docs=true')
    for (const row of response.data.rows) {
      const response = await axios.get(options.target + '/' + db + '/' + row.id)
      if (typeof response.data.views != 'undefined') {
        var views = response.data.views
        for (var name in views) {
          console.log("start index:" + options.target + '/' + db + '/_view/' + row.id + '/' + name)
          const response = await timeoutSafeGet(options.target + '/' + db + '/' + row.id + '/_view/' + name + '?limit=0')
          console.log("end index:" + options.target + '/' + db + '/_view/' + row.id + '/' + name)
        }
      } 
    }
  }
}
