const https = require('https')

module.exports = (pluginContext) => {
  return (word, env = {}) => {
    return new Promise((resolve, reject) => {
      const url = `https://dict.youdao.com/suggest?num=5&ver=3.0&doctype=json&cache=false&le=en&q=${word}`
      pluginContext.console.log('info', 'Request to youdao', {url})

      https.get(url, (response) => {
        let responseText = ''

        response.on('data', (chunk) => {
          responseText += chunk
        })

        response.on('end', () => {
          pluginContext.console.log('info', 'Response from youdao', {responseText})
          resolve(JSON.parse(responseText).data.entries.map(entry => ({
            icon: 'fa-book', title: entry.entry, subtitle: entry.explain, value: entry.entry,
          })))
        })
      }).on('error', (error) => {
        pluginContext.console.log('Request to dict.youdao.com error', {error})
      })
    })
  }
}
