import { AtpAgent } from '@atproto/api'
import 'dotenv/config'

const agent = new AtpAgent({
  service: 'https://bsky.social'
})

await agent.login({
  identifier: process.env.ID,
  password: process.env.PASSWORD
})
const { data } = await agent.getTimeline({
  limit: 20,
})

const { feed } = data

for (const content of feed) {
  const { post } = content
  const { author, record } = post
  const { handle, displayName } = author
  const { text } = record
  console.log(`${displayName} (@${handle})`)
  console.log('\t' + text)
  console.log('\n')
}
