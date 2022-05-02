import { Question } from '../generated/graphql'

const sortAnswers = (
  sortBy: string,
  answers: Question['answers'],
  acceptedAnswer: Question['acceptedAnswer']
) => {
  if (answers.length < 2) {
    return answers
  }
  if (sortBy === 'OLDEST') {
    return [...answers].sort(
      (a, b) =>
        new Date(a?.createdAt).valueOf() - new Date(b?.createdAt).valueOf()
    )
  } else if (sortBy === 'NEWEST') {
    return [...answers].sort(
      (a, b) =>
        new Date(b?.createdAt).valueOf() - new Date(a?.createdAt).valueOf()
    )
  } else {
    const accepted = answers.find((a) => a?._id === acceptedAnswer)
    const restSorted = answers
      .filter((a) => a?._id !== acceptedAnswer)
      .sort((a, b) => b!.points - a!.points)

    if (accepted) {
      return [accepted, ...restSorted]
    } else {
      return restSorted
    }
  }
}

export default sortAnswers
