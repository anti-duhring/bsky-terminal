export const renderPost = (post, identation = '', breakline = '\n') => {
  const { author, record } = post
  const { handle, displayName } = author
  const { text } = record
  const ASCIIline = '└──'

  return `${identation !== '' ? identation + '|' : ''}${breakline}${identation !== '' ? identation + ASCIIline : ''}${displayName} (@${handle}) - ${renderInteractionsCount(post)}\n${identation}${text.replace(/[\r\n]+/g, '\n' + identation)}`
}

const renderInteractionsCount = (post) => {
  const { likeCount, quoteCount, replyCount } = post
  return `${likeCount} like${likeCount == 1 ? '' : 's'} ${quoteCount} quote${quoteCount == 1 ? '' : 's'} ${replyCount} ${replyCount == 1 ? 'reply' : 'replies'}`
}
