export const getChangedTags = (source: string[], target: string[]) => {
  const removed: string[] = []
  const added: string[] = []
  for (const tag of target) {
    if (!source.includes(tag)) {
      added.push(tag)
    }
  }
  for (const tag of source) {
    if (!target.includes(tag)) {
      removed.push(tag)
    }
  }
  return {
    removed,
    added,
  }
}
