import { Author, Question } from "../generated/graphql"

export const upvote = (upvotedBy: Question['upvotedBy'], downvotedBy: Question['downvotedBy'], user: Author) => {
  let updatedUpvotedArr
  let updatedDownvotedArr

  if (upvotedBy.includes(user._id)) {
    updatedUpvotedArr = upvotedBy.filter(u => u !== user._id)
    updatedDownvotedArr = downvotedBy
  } else {
    updatedUpvotedArr = [...upvotedBy, user._id]
    updatedDownvotedArr = downvotedBy.filter(d => d !== user._id)
  }
  const updatedPoints = updatedUpvotedArr.length - updatedDownvotedArr.length

  return { updatedUpvotedArr, updatedDownvotedArr, updatedPoints }
}

export const downvote = (upvotedBy: Question['upvotedBy'], downvotedBy: Question['downvotedBy'], user: Author) => {
  let updatedUpvotedArr
  let updatedDownvotedArr

  if (downvotedBy.includes(user._id)) {
    updatedDownvotedArr = downvotedBy.filter(d => d !== user._id)
    updatedUpvotedArr = upvotedBy
  } else {
    updatedDownvotedArr = [...downvotedBy, user._id]
    updatedUpvotedArr = upvotedBy.filter(u => u !== user._id)
  }
  const updatedPoints = updatedUpvotedArr.length - updatedDownvotedArr.length

  return { updatedUpvotedArr, updatedDownvotedArr, updatedPoints }
}
