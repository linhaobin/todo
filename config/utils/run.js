const format = require('./format')

function run(task, options) {
  const start = new Date()
  console.info(
    `[${format(start)}] Starting '${task.name}${options
      ? ` (${options})`
      : ''}'...`
  )
  return task(options).then(resolution => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.info(
      `[${format(end)}] Finished '${task.name}${options
        ? ` (${options})`
        : ''}' after ${time} ms`
    )
    return resolution
  })
}

module.exports = run
