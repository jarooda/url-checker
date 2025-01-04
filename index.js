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
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            console.log(`"${url}" is valid ✅`)

            // save the valid url to output.txt
            fs.appendFileSync("output.txt", `"${url}" is valid ✅\n`)
          } else {
            console.log(`"${url}" is invalid ❌`)

            // save the invalid url to output.txt
            fs.appendFileSync("output.txt", `"${url}" is invalid ❌\n`)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
})
