import { AtpAgent } from '@atproto/api'
import 'dotenv/config'
import { renderPost } from './renderPost.js'

const agent = new AtpAgent({
  service: 'https://bsky.social'
})

await agent.login({
  identifier: process.env.ID,
  password: process.env.PASSWORD
})
const { data } = await agent.getTimeline({
  limit: 2,
})

const { feed } = data

for (const content of feed) {
  const { post, reply } = content
  const hasRoot = reply && reply.root && reply.root.record.text !== reply.parent.record.text
  const hasParent = reply && reply.parent

  if (reply) {
    if (reply.root && reply.root.record.text !== reply.parent.record.text) {
      console.log(renderPost(reply.root, '', '\n\n\n'))
    }

    console.log(renderPost(reply.parent, `${hasRoot ? '\t' : ''}`))
  }

  console.log(renderPost(post, `${hasRoot ? '\t\t' : hasParent ? '\t' : ''}`))
}
