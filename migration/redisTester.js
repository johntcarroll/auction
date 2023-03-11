const { client } = require("process")
const { createClient } = require("redis")
const test = async () => {
  let client
  try {
    client = createClient()
    client.on("error", (err) => console.log("Redis Client Error", err))
    await client.connect()
    const keys = await client.keys("*")
    const teams = await Promise.all(keys.map((key) => client.json.get(key)))
    console.log(teams)
  } catch (e) {
    console.error(e)
  } finally {
    if (client) client.quit()
  }
}

test()
