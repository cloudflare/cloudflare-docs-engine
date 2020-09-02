const fs = require("fs")
const { exec } = require("child_process")
const { pathPrefix } = require("../docs-config.js")

console.log("Running postbuild.js")

if (!pathPrefix && pathPrefix !== "") {
  console.error(`docs-config.js must have a pathPrefix set`)
}

if (pathPrefix.length && !pathPrefix.startsWith("/")) {
  console.error(`docs-config.js pathPrefix must start with a forward slash "/"`)
  return
}

const bucketRoot = "./.docs/public"
const oldPath = `${bucketRoot}`
const newPath = `${bucketRoot}${pathPrefix}`

const handleExec = (completed) => {
  return (error, stdout, stderr) => {
    if (error) {
      console.error(error)

    } else {
      const trimmedStdout = stdout.trim()
      if (trimmedStdout) console.log(trimmedStdout)

      const trimmedStderr = stderr.trim()
      if (trimmedStderr) console.log(trimmedStderr)

      completed()
    }
  }
}

const move = () => {
  exec(`mv ${oldPath}/* ${newPath}`, handleExec(() => {
    console.log("Completed postbuild")
  }))
}

if (newPath !== oldPath) {
  exec(`mkdir -p ${newPath}`, handleExec(() => {
    move()
  }))
}
