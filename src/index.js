module.exports = (pluginContext) => {
  return (word, env = {}) => {
    return new Promise((resolve, reject) => {
      fetch(`https://dict.youdao.com/suggest?num=5&ver=3.0&doctype=json&cache=false&le=en&q=${word}`)
        .then(rsp => rsp.json())
        .then(data => data.data.entries)
	.then(entries.map(entry => resolve([
          {
            icon: 'fa-book',
            title: entry.entry,
            subtitle: entry.explain,
          },
	])))
    })
  }
}
