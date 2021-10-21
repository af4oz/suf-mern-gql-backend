import { ApolloError } from '@apollo/client'
import { formatDistanceToNowStrict, format } from 'date-fns'
import React from 'react'

export const filterDuplicates = <T extends { _id: any }>(originalArr: T[], arrToConcat: T[]) => {
  return arrToConcat.filter((a) => !originalArr.find((o) => o._id === a._id))
}

export const formatDateAgo = (date: string | number | Date) => {
  return formatDistanceToNowStrict(new Date(date))
}

export const formatDayTime = (date: string | number | Date) => {
  return format(new Date(date), "MMM d', ' yy 'at' H':'mm")
}

export const getErrorMsg = (err: ApolloError) => {
  if (err.graphQLErrors[0]?.message) {
    return err.graphQLErrors[0].message
  } else {
    return err?.message
  }
}

export const trapSpaceKey = (e: React.KeyboardEvent, func: () => void) => {
  if (e.code === "Space") {
    console.log('clicked')
    func()
  }
}
