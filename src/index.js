const got = require('got')

module.exports = (pluginContext) => {
  return (word, env = {}) => {
    return new Promise((resolve, reject) => {
      got(`https://dict.youdao.com/suggest?num=5&ver=3.0&doctype=json&cache=false&le=en&q=${word}`, {json: true})
	.then(res => res.body.data.entries.map(entry => resolve([
          {
            icon: 'fa-book',
            title: entry.entry,
            subtitle: entry.explain,
          },
	])))
    })
  }
}
