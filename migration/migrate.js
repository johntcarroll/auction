const { createClient } = require("redis")
let kenpom = require("./kenpom")
const determineId = (name) =>
  `team:${name
    .trim()
    .toLowerCase()
    .replace(/[^\w!?]/g, "")}`

const getPredictionData = async () => {
  let req = await fetch(
    "https://projects.fivethirtyeight.com/march-madness-api/2023/madness.json"
  )
  let data = await req.json()
  return await data.forecasts.mens.current_run.teams
}
const historicalData = require("./history")
const migrate = async () => {
  let client
  try {
    client = createClient()
    await client.connect()
    const predictionData = await getPredictionData()

    await Promise.all(
      kenpom.map((kenpomTeam) => {
        pdMatch = predictionData.find(
          (pdTeam) => pdTeam.team_name == kenpomTeam[1]
        )
        if (!pdMatch) throw "no match!" + JSON.stringify(kenpomTeam)

        let teamData = {
          id: determineId(kenpomTeam[1]),
          seed: kenpomTeam[21],
          region: pdMatch.team_region,
          elo: pdMatch.team_rating,
          playin: pdMatch.playin_flag,
          price: 0,
          sold: false,
          owned: false,
          kenpomRank: kenpomTeam[0],
          name: kenpomTeam[1],
          conference: kenpomTeam[2],
          record: kenpomTeam[3],
          adjustedEfficiencyMargin: kenpomTeam[4],
          adjustedOffensiveEfficiency: kenpomTeam[5],
          adjustedOffensiveEfficiencyRank: kenpomTeam[6],
          adjustedDefensiveEfficiency: kenpomTeam[7],
          adjustedDefensiveEfficiencyRank: kenpomTeam[8],
          adjustedTempo: kenpomTeam[9],
          adjustedTempoRank: kenpomTeam[10],
          luck: kenpomTeam[11],
          luckRank: kenpomTeam[12],
          strengthOfSchedule: kenpomTeam[13],
          strengthOfScheduleRank: kenpomTeam[14],
          opponentAdjustedOffensiveEfficiency: kenpomTeam[15],
          opponentAdjustedOffensiveEfficiencyRank: kenpomTeam[16],
          opponentAdjustedDefensiveEfficiency: kenpomTeam[17],
          opponentAdjustedDefensiveEfficiencyRank: kenpomTeam[18],
          nonConferenceStrengthOfSchedule: kenpomTeam[19],
          nonConferenceStrengthOfScheduleRank: kenpomTeam[20],
          chanceToAdvance: {
            64: pdMatch.rd1_win,
            32: pdMatch.rd2_win,
            16: pdMatch.rd3_win,
            8: pdMatch.rd4_win,
            4: pdMatch.rd5_win,
            2: pdMatch.rd6_win,
            1: pdMatch.rd7_win,
          },
        }

        teamData.name = teamData.name.replace(/&/g, "")

        return client.json.set(determineId(kenpomTeam[1]), "$", teamData)
      })
    )

    await Promise.all(
      historicalData.map((historyLine) =>
        client.json.set(
          `history:${historyLine[0]}:${historyLine[1]
            .toLowerCase()
            .replace(/\s/g, "")}`,
          "$",
          {
            year: historyLine[0],
            team: historyLine[1],
            seed: historyLine[2],
            price: historyLine[3],
          }
        )
      )
    )
  } catch (e) {
    console.error(e)
  } finally {
    if (client) client.quit()
  }
}
migrate()
