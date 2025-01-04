const fs = require("fs")

fs.readFile("urls.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const urls = data.split("\n")
  console.log("Checking the following urls: ............")

  // remove output.txt if exist
  if (fs.existsSync("output.txt")) {
    fs.unlinkSync("output.txt")

    // and then create a new one
    fs.writeFileSync("output.txt", "")
  }

  urls.forEach((url) => {
    if (url) {
      let timeStart = new Date().toLocaleString()
      let log = ''

      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            const timePassed = new Date().getTime() - new Date(timeStart).getTime()
            log = `"${url}" is valid ✅ - ${timePassed}ms`

            console.log(log);
          } else {
            log = `"${url}" is invalid ❌ - ERR:${res.status}`
            console.log(log)
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          fs.appendFileSync("output.txt", `${log}\n`)
        })
    }
  })
})
