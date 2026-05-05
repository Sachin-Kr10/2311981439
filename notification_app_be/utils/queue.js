const queue = []
let processing = false

function addJob(job) {
  queue.push(job)
  processQueue()
}

async function processQueue() {
  if (processing) return
  processing = true

  while (queue.length > 0) {
    const job = queue.shift()
    await job()
  }

  processing = false
}

module.exports = { addJob }