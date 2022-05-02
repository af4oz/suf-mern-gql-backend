import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
}

export type Answer = {
  __typename?: 'Answer'
  _id: Scalars['ID']
  author: Author
  body: Scalars['String']
  comments: Array<Maybe<Comment>>
  createdAt: Scalars['DateTime']
  points: Scalars['Int']
  updatedAt: Scalars['DateTime']
  voted?: Maybe<VoteType>
}

export type AnswerVotes = {
  __typename?: 'AnswerVotes'
  ansId: Scalars['ID']
  userId: Scalars['ID']
  vote: VoteType
}

export type Author = {
  __typename?: 'Author'
  _id: Scalars['ID']
  username: Scalars['String']
}

export type Comment = {
  __typename?: 'Comment'
  _id: Scalars['ID']
  author: Author
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type LoggedUser = {
  __typename?: 'LoggedUser'
  _id: Scalars['ID']
  role: Scalars['String']
  token: Scalars['String']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  acceptAnswer: Question
  addAnsComment: Array<Comment>
  addQuesComment: Array<Comment>
  deleteAnsComment: Scalars['ID']
  deleteAnswer: Scalars['ID']
  deleteQuesComment: Scalars['ID']
  deleteQuestion: Scalars['ID']
  editAnsComment: Array<Comment>
  editAnswer: Array<Answer>
  editQuesComment: Array<Comment>
  editQuestion: Question
  login: LoggedUser
  postAnswer: Array<Answer>
  postQuestion: Question
  register: LoggedUser
  voteAnswer: Answer
  voteQuestion: Question
}

export type MutationAcceptAnswerArgs = {
  ansId: Scalars['ID']
  quesId: Scalars['ID']
}

export type MutationAddAnsCommentArgs = {
  ansId: Scalars['ID']
  body: Scalars['String']
}

export type MutationAddQuesCommentArgs = {
  body: Scalars['String']
  quesId: Scalars['ID']
}

export type MutationDeleteAnsCommentArgs = {
  ansId: Scalars['ID']
  commentId: Scalars['ID']
}

export type MutationDeleteAnswerArgs = {
  ansId: Scalars['ID']
  quesId: Scalars['ID']
}

export type MutationDeleteQuesCommentArgs = {
  commentId: Scalars['ID']
  quesId: Scalars['ID']
}

export type MutationDeleteQuestionArgs = {
  quesId: Scalars['ID']
}

export type MutationEditAnsCommentArgs = {
  ansId: Scalars['ID']
  body: Scalars['String']
  commentId: Scalars['ID']
}

export type MutationEditAnswerArgs = {
  ansId: Scalars['ID']
  body: Scalars['String']
  quesId: Scalars['ID']
}

export type MutationEditQuesCommentArgs = {
  body: Scalars['String']
  commentId: Scalars['ID']
  quesId: Scalars['ID']
}

export type MutationEditQuestionArgs = {
  body: Scalars['String']
  quesId: Scalars['ID']
  tags: Array<Scalars['String']>
  title: Scalars['String']
}

export type MutationLoginArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationPostAnswerArgs = {
  body: Scalars['String']
  quesId: Scalars['ID']
}

export type MutationPostQuestionArgs = {
  body: Scalars['String']
  tags: Array<Scalars['String']>
  title: Scalars['String']
}

export type MutationRegisterArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationVoteAnswerArgs = {
  ansId: Scalars['ID']
  quesId: Scalars['ID']
  voteType: VoteType
}

export type MutationVoteQuestionArgs = {
  quesId: Scalars['ID']
  voteType: VoteType
}

export type NextPrevPage = {
  __typename?: 'NextPrevPage'
  limit: Scalars['Float']
  page: Scalars['Float']
}

export type PaginatedQuesList = {
  __typename?: 'PaginatedQuesList'
  next?: Maybe<NextPrevPage>
  previous?: Maybe<NextPrevPage>
  questions: Array<Maybe<Question>>
}

export type Query = {
  __typename?: 'Query'
  getAllTags: Array<Tag>
  getAllUsers: Array<User>
  getQuestions: PaginatedQuesList
  getUser: User
  viewQuestion: Question
  whoami: User
}

export type QueryGetQuestionsArgs = {
  filterBySearch?: Maybe<Scalars['String']>
  filterByTag?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  page: Scalars['Int']
  sortBy: SortByType
}

export type QueryGetUserArgs = {
  username: Scalars['String']
}

export type QueryViewQuestionArgs = {
  quesId: Scalars['ID']
}

export type Question = {
  __typename?: 'Question'
  _id: Scalars['ID']
  acceptedAnswer?: Maybe<Scalars['ID']>
  answerCount: Scalars['Int']
  answers: Array<Maybe<Answer>>
  author: Author
  body: Scalars['String']
  comments: Array<Maybe<Comment>>
  createdAt: Scalars['DateTime']
  hotAlgo: Scalars['Float']
  points: Scalars['Int']
  tags: Array<Scalars['String']>
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  views: Scalars['Int']
  voted?: Maybe<VoteType>
}

export type QuestionVotes = {
  __typename?: 'QuestionVotes'
  quesId: Scalars['ID']
  userId: Scalars['ID']
  vote: VoteType
}

export type RecentActivity = {
  __typename?: 'RecentActivity'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  points: Scalars['Int']
  title: Scalars['String']
}

export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum SortByType {
  Hot = 'HOT',
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
  Views = 'VIEWS',
  Votes = 'VOTES',
}

export type Tag = {
  __typename?: 'Tag'
  count: Scalars['Float']
  tagName: Scalars['String']
}

export type User = {
  __typename?: 'User'
  _id: Scalars['ID']
  answers: Array<Maybe<Answer>>
  createdAt: Scalars['DateTime']
  questions: Array<Maybe<Question>>
  recentAnswers: Array<Maybe<RecentActivity>>
  recentQuestions: Array<Maybe<RecentActivity>>
  rep: Scalars['Int']
  role: RoleType
  totalAnswers: Scalars['Int']
  totalQuestions: Scalars['Int']
  username: Scalars['String']
}

export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE',
}

export type AuthorDetailsFragment = {
  __typename?: 'Author'
  _id: string
  username: string
}

export type AnswerDetailsFragment = {
  __typename?: 'Answer'
  _id: string
  body: string
  points: number
  voted?: VoteType | null | undefined
  createdAt: any
  updatedAt: any
  author: { __typename?: 'Author'; _id: string; username: string }
  comments: Array<
    | {
        __typename?: 'Comment'
        _id: string
        body: string
        createdAt: any
        updatedAt: any
        author: { __typename?: 'Author'; _id: string; username: string }
      }
    | null
    | undefined
  >
}

export type QuestionDetailsFragment = {
  __typename?: 'Question'
  _id: string
  title: string
  body: string
  tags: Array<string>
  points: number
  views: number
  acceptedAnswer?: string | null | undefined
  voted?: VoteType | null | undefined
  createdAt: any
  updatedAt: any
  author: { __typename?: 'Author'; _id: string; username: string }
  comments: Array<
    | {
        __typename?: 'Comment'
        _id: string
        body: string
        createdAt: any
        updatedAt: any
        author: { __typename?: 'Author'; _id: string; username: string }
      }
    | null
    | undefined
  >
  answers: Array<
    | {
        __typename?: 'Answer'
        _id: string
        body: string
        points: number
        voted?: VoteType | null | undefined
        createdAt: any
        updatedAt: any
        author: { __typename?: 'Author'; _id: string; username: string }
        comments: Array<
          | {
              __typename?: 'Comment'
              _id: string
              body: string
              createdAt: any
              updatedAt: any
              author: { __typename?: 'Author'; _id: string; username: string }
            }
          | null
          | undefined
        >
      }
    | null
    | undefined
  >
}

export type PostQuestionDetailsFragment = {
  __typename?: 'Question'
  _id: string
  title: string
  body: string
  tags: Array<string>
  points: number
  views: number
  voted?: VoteType | null | undefined
  createdAt: any
  updatedAt: any
  author: { __typename?: 'Author'; _id: string; username: string }
}

export type LoggedUserDetailsFragment = {
  __typename?: 'LoggedUser'
  _id: string
  username: string
  role: string
  token: string
}

export type CommentDetailsFragment = {
  __typename?: 'Comment'
  _id: string
  body: string
  createdAt: any
  updatedAt: any
  author: { __typename?: 'Author'; _id: string; username: string }
}

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type RegisterUserMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'LoggedUser'
    _id: string
    username: string
    role: string
    token: string
  }
}

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginUserMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'LoggedUser'
    _id: string
    username: string
    role: string
    token: string
  }
}

export type AddQuestionMutationVariables = Exact<{
  title: Scalars['String']
  body: Scalars['String']
  tags: Array<Scalars['String']> | Scalars['String']
}>

export type AddQuestionMutation = {
  __typename?: 'Mutation'
  postQuestion: {
    __typename?: 'Question'
    _id: string
    title: string
    body: string
    tags: Array<string>
    points: number
    views: number
    voted?: VoteType | null | undefined
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
  }
}

export type UpdateQuestionMutationVariables = Exact<{
  quesId: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
  tags: Array<Scalars['String']> | Scalars['String']
}>

export type UpdateQuestionMutation = {
  __typename?: 'Mutation'
  editQuestion: {
    __typename?: 'Question'
    _id: string
    title: string
    body: string
    tags: Array<string>
    points: number
    views: number
    acceptedAnswer?: string | null | undefined
    voted?: VoteType | null | undefined
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
    comments: Array<
      | {
          __typename?: 'Comment'
          _id: string
          body: string
          createdAt: any
          updatedAt: any
          author: { __typename?: 'Author'; _id: string; username: string }
        }
      | null
      | undefined
    >
    answers: Array<
      | {
          __typename?: 'Answer'
          _id: string
          body: string
          points: number
          voted?: VoteType | null | undefined
          createdAt: any
          updatedAt: any
          author: { __typename?: 'Author'; _id: string; username: string }
          comments: Array<
            | {
                __typename?: 'Comment'
                _id: string
                body: string
                createdAt: any
                updatedAt: any
                author: {
                  __typename?: 'Author'
                  _id: string
                  username: string
                }
              }
            | null
            | undefined
          >
        }
      | null
      | undefined
    >
  }
}

export type RemoveQuestionMutationVariables = Exact<{
  quesId: Scalars['ID']
}>

export type RemoveQuestionMutation = {
  __typename?: 'Mutation'
  deleteQuestion: string
}

export type SubmitQuesVoteMutationVariables = Exact<{
  quesId: Scalars['ID']
  voteType: VoteType
}>

export type SubmitQuesVoteMutation = {
  __typename?: 'Mutation'
  voteQuestion: {
    __typename?: 'Question'
    _id: string
    voted?: VoteType | null | undefined
    points: number
  }
}

export type PostQuesCommentMutationVariables = Exact<{
  quesId: Scalars['ID']
  body: Scalars['String']
}>

export type PostQuesCommentMutation = {
  __typename?: 'Mutation'
  addQuesComment: Array<{
    __typename?: 'Comment'
    _id: string
    body: string
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
  }>
}

export type UpdateQuesCommentMutationVariables = Exact<{
  quesId: Scalars['ID']
  commentId: Scalars['ID']
  body: Scalars['String']
}>

export type UpdateQuesCommentMutation = {
  __typename?: 'Mutation'
  editQuesComment: Array<{
    __typename?: 'Comment'
    _id: string
    body: string
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
  }>
}

export type RemoveQuesCommentMutationVariables = Exact<{
  quesId: Scalars['ID']
  commentId: Scalars['ID']
}>

export type RemoveQuesCommentMutation = {
  __typename?: 'Mutation'
  deleteQuesComment: string
}

export type AddAnswerMutationVariables = Exact<{
  quesId: Scalars['ID']
  body: Scalars['String']
}>

export type AddAnswerMutation = {
  __typename?: 'Mutation'
  postAnswer: Array<{
    __typename?: 'Answer'
    _id: string
    body: string
    points: number
    voted?: VoteType | null | undefined
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
    comments: Array<
      | {
          __typename?: 'Comment'
          _id: string
          body: string
          createdAt: any
          updatedAt: any
          author: { __typename?: 'Author'; _id: string; username: string }
        }
      | null
      | undefined
    >
  }>
}

export type UpdateAnswerMutationVariables = Exact<{
  quesId: Scalars['ID']
  ansId: Scalars['ID']
  body: Scalars['String']
}>

export type UpdateAnswerMutation = {
  __typename?: 'Mutation'
  editAnswer: Array<{
    __typename?: 'Answer'
    _id: string
    body: string
    points: number
    voted?: VoteType | null | undefined
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
    comments: Array<
      | {
          __typename?: 'Comment'
          _id: string
          body: string
          createdAt: any
          updatedAt: any
          author: { __typename?: 'Author'; _id: string; username: string }
        }
      | null
      | undefined
    >
  }>
}

export type RemoveAnswerMutationVariables = Exact<{
  quesId: Scalars['ID']
  ansId: Scalars['ID']
}>

export type RemoveAnswerMutation = {
  __typename?: 'Mutation'
  deleteAnswer: string
}

export type SubmitAnsVoteMutationVariables = Exact<{
  quesId: Scalars['ID']
  ansId: Scalars['ID']
  voteType: VoteType
}>

export type SubmitAnsVoteMutation = {
  __typename?: 'Mutation'
  voteAnswer: {
    __typename?: 'Answer'
    _id: string
    voted?: VoteType | null | undefined
    points: number
  }
}

export type SubmitAcceptAnsMutationVariables = Exact<{
  quesId: Scalars['ID']
  ansId: Scalars['ID']
}>

export type SubmitAcceptAnsMutation = {
  __typename?: 'Mutation'
  acceptAnswer: {
    __typename?: 'Question'
    _id: string
    acceptedAnswer?: string | null | undefined
  }
}

export type PostAnsCommentMutationVariables = Exact<{
  ansId: Scalars['ID']
  body: Scalars['String']
}>

export type PostAnsCommentMutation = {
  __typename?: 'Mutation'
  addAnsComment: Array<{
    __typename?: 'Comment'
    _id: string
    body: string
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
  }>
}

export type UpdateAnsCommentMutationVariables = Exact<{
  ansId: Scalars['ID']
  commentId: Scalars['ID']
  body: Scalars['String']
}>

export type UpdateAnsCommentMutation = {
  __typename?: 'Mutation'
  editAnsComment: Array<{
    __typename?: 'Comment'
    _id: string
    body: string
    createdAt: any
    updatedAt: any
    author: { __typename?: 'Author'; _id: string; username: string }
  }>
}

export type RemoveAnsCommentMutationVariables = Exact<{
  ansId: Scalars['ID']
  commentId: Scalars['ID']
}>

export type RemoveAnsCommentMutation = {
  __typename?: 'Mutation'
  deleteAnsComment: string
}

export type FetchQuestionsQueryVariables = Exact<{
  sortBy: SortByType
  page: Scalars['Int']
  limit: Scalars['Int']
  filterByTag?: Maybe<Scalars['String']>
  filterBySearch?: Maybe<Scalars['String']>
}>

export type FetchQuestionsQuery = {
  __typename?: 'Query'
  getQuestions: {
    __typename?: 'PaginatedQuesList'
    next?: { __typename?: 'NextPrevPage'; page: number } | null | undefined
    previous?: { __typename?: 'NextPrevPage'; page: number } | null | undefined
    questions: Array<
      | {
          __typename?: 'Question'
          _id: string
          title: string
          body: string
          tags: Array<string>
          points: number
          views: number
          createdAt: any
          updatedAt: any
          answerCount: number
          author: { __typename?: 'Author'; _id: string; username: string }
        }
      | null
      | undefined
    >
  }
}

export type FetchQuestionQueryVariables = Exact<{
  quesId: Scalars['ID']
}>

export type FetchQuestionQuery = {
  __typename?: 'Query'
  viewQuestion: {
    __typename?: 'Question'
    _id: string
    title: string
    body: string
    tags: Array<string>
    points: number
    views: number
    createdAt: any
    updatedAt: any
    acceptedAnswer?: string | null | undefined
    voted?: VoteType | null | undefined
    author: { __typename?: 'Author'; _id: string; username: string }
    answers: Array<
      | {
          __typename?: 'Answer'
          _id: string
          body: string
          points: number
          voted?: VoteType | null | undefined
          createdAt: any
          updatedAt: any
          author: { __typename?: 'Author'; _id: string; username: string }
          comments: Array<
            | {
                __typename?: 'Comment'
                _id: string
                body: string
                createdAt: any
                updatedAt: any
                author: {
                  __typename?: 'Author'
                  _id: string
                  username: string
                }
              }
            | null
            | undefined
          >
        }
      | null
      | undefined
    >
    comments: Array<
      | {
          __typename?: 'Comment'
          _id: string
          body: string
          createdAt: any
          updatedAt: any
          author: { __typename?: 'Author'; _id: string; username: string }
        }
      | null
      | undefined
    >
  }
}

export type FetchUserQueryVariables = Exact<{
  username: Scalars['String']
}>

export type FetchUserQuery = {
  __typename?: 'Query'
  getUser: {
    __typename?: 'User'
    _id: string
    username: string
    role: RoleType
    createdAt: any
    rep: number
    totalQuestions: number
    totalAnswers: number
    recentQuestions: Array<
      | {
          __typename?: 'RecentActivity'
          _id: string
          title: string
          points: number
          createdAt: any
        }
      | null
      | undefined
    >
    recentAnswers: Array<
      | {
          __typename?: 'RecentActivity'
          _id: string
          title: string
          points: number
          createdAt: any
        }
      | null
      | undefined
    >
  }
}

export type FetchAllTagsQueryVariables = Exact<{ [key: string]: never }>

export type FetchAllTagsQuery = {
  __typename?: 'Query'
  getAllTags: Array<{ __typename?: 'Tag'; tagName: string; count: number }>
}

export type FetchAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type FetchAllUsersQuery = {
  __typename?: 'Query'
  getAllUsers: Array<{
    __typename?: 'User'
    _id: string
    username: string
    createdAt: any
  }>
}

export const AuthorDetailsFragmentDoc = gql`
  fragment AuthorDetails on Author {
    _id
    username
  }
`
export const CommentDetailsFragmentDoc = gql`
  fragment CommentDetails on Comment {
    _id
    author {
      ...AuthorDetails
    }
    body
    createdAt
    updatedAt
  }
  ${AuthorDetailsFragmentDoc}
`
export const AnswerDetailsFragmentDoc = gql`
  fragment AnswerDetails on Answer {
    _id
    author {
      ...AuthorDetails
    }
    body
    comments {
      ...CommentDetails
    }
    points
    voted
    createdAt
    updatedAt
  }
  ${AuthorDetailsFragmentDoc}
  ${CommentDetailsFragmentDoc}
`
export const QuestionDetailsFragmentDoc = gql`
  fragment QuestionDetails on Question {
    _id
    author {
      ...AuthorDetails
    }
    title
    body
    tags
    points
    views
    acceptedAnswer
    comments {
      ...CommentDetails
    }
    answers {
      ...AnswerDetails
    }
    voted
    createdAt
    updatedAt
  }
  ${AuthorDetailsFragmentDoc}
  ${CommentDetailsFragmentDoc}
  ${AnswerDetailsFragmentDoc}
`
export const PostQuestionDetailsFragmentDoc = gql`
  fragment PostQuestionDetails on Question {
    _id
    author {
      ...AuthorDetails
    }
    title
    body
    tags
    points
    views
    voted
    createdAt
    updatedAt
  }
  ${AuthorDetailsFragmentDoc}
`
export const LoggedUserDetailsFragmentDoc = gql`
  fragment LoggedUserDetails on LoggedUser {
    _id
    username
    role
    token
  }
`
export const RegisterUserDocument = gql`
  mutation registerUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ...LoggedUserDetails
    }
  }
  ${LoggedUserDetailsFragmentDoc}
`
export type RegisterUserMutationFn = Apollo.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserDocument, options)
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>
export type RegisterUserMutationResult =
  Apollo.MutationResult<RegisterUserMutation>
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>
export const LoginUserDocument = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...LoggedUserDetails
    }
  }
  ${LoggedUserDetailsFragmentDoc}
`
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    options
  )
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>
export const AddQuestionDocument = gql`
  mutation addQuestion($title: String!, $body: String!, $tags: [String!]!) {
    postQuestion(title: $title, body: $body, tags: $tags) {
      ...PostQuestionDetails
    }
  }
  ${PostQuestionDetailsFragmentDoc}
`
export type AddQuestionMutationFn = Apollo.MutationFunction<
  AddQuestionMutation,
  AddQuestionMutationVariables
>

/**
 * __useAddQuestionMutation__
 *
 * To run a mutation, you first call `useAddQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuestionMutation, { data, loading, error }] = useAddQuestionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddQuestionMutation,
    AddQuestionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddQuestionMutation, AddQuestionMutationVariables>(
    AddQuestionDocument,
    options
  )
}
export type AddQuestionMutationHookResult = ReturnType<
  typeof useAddQuestionMutation
>
export type AddQuestionMutationResult =
  Apollo.MutationResult<AddQuestionMutation>
export type AddQuestionMutationOptions = Apollo.BaseMutationOptions<
  AddQuestionMutation,
  AddQuestionMutationVariables
>
export const UpdateQuestionDocument = gql`
  mutation updateQuestion(
    $quesId: ID!
    $title: String!
    $body: String!
    $tags: [String!]!
  ) {
    editQuestion(quesId: $quesId, title: $title, body: $body, tags: $tags) {
      ...QuestionDetails
    }
  }
  ${QuestionDetailsFragmentDoc}
`
export type UpdateQuestionMutationFn = Apollo.MutationFunction<
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables
>

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >(UpdateQuestionDocument, options)
}
export type UpdateQuestionMutationHookResult = ReturnType<
  typeof useUpdateQuestionMutation
>
export type UpdateQuestionMutationResult =
  Apollo.MutationResult<UpdateQuestionMutation>
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables
>
export const RemoveQuestionDocument = gql`
  mutation removeQuestion($quesId: ID!) {
    deleteQuestion(quesId: $quesId)
  }
`
export type RemoveQuestionMutationFn = Apollo.MutationFunction<
  RemoveQuestionMutation,
  RemoveQuestionMutationVariables
>

/**
 * __useRemoveQuestionMutation__
 *
 * To run a mutation, you first call `useRemoveQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuestionMutation, { data, loading, error }] = useRemoveQuestionMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *   },
 * });
 */
export function useRemoveQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveQuestionMutation,
    RemoveQuestionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveQuestionMutation,
    RemoveQuestionMutationVariables
  >(RemoveQuestionDocument, options)
}
export type RemoveQuestionMutationHookResult = ReturnType<
  typeof useRemoveQuestionMutation
>
export type RemoveQuestionMutationResult =
  Apollo.MutationResult<RemoveQuestionMutation>
export type RemoveQuestionMutationOptions = Apollo.BaseMutationOptions<
  RemoveQuestionMutation,
  RemoveQuestionMutationVariables
>
export const SubmitQuesVoteDocument = gql`
  mutation submitQuesVote($quesId: ID!, $voteType: VoteType!) {
    voteQuestion(quesId: $quesId, voteType: $voteType) {
      _id
      voted
      points
    }
  }
`
export type SubmitQuesVoteMutationFn = Apollo.MutationFunction<
  SubmitQuesVoteMutation,
  SubmitQuesVoteMutationVariables
>

/**
 * __useSubmitQuesVoteMutation__
 *
 * To run a mutation, you first call `useSubmitQuesVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuesVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuesVoteMutation, { data, loading, error }] = useSubmitQuesVoteMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      voteType: // value for 'voteType'
 *   },
 * });
 */
export function useSubmitQuesVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitQuesVoteMutation,
    SubmitQuesVoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SubmitQuesVoteMutation,
    SubmitQuesVoteMutationVariables
  >(SubmitQuesVoteDocument, options)
}
export type SubmitQuesVoteMutationHookResult = ReturnType<
  typeof useSubmitQuesVoteMutation
>
export type SubmitQuesVoteMutationResult =
  Apollo.MutationResult<SubmitQuesVoteMutation>
export type SubmitQuesVoteMutationOptions = Apollo.BaseMutationOptions<
  SubmitQuesVoteMutation,
  SubmitQuesVoteMutationVariables
>
export const PostQuesCommentDocument = gql`
  mutation postQuesComment($quesId: ID!, $body: String!) {
    addQuesComment(quesId: $quesId, body: $body) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export type PostQuesCommentMutationFn = Apollo.MutationFunction<
  PostQuesCommentMutation,
  PostQuesCommentMutationVariables
>

/**
 * __usePostQuesCommentMutation__
 *
 * To run a mutation, you first call `usePostQuesCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostQuesCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postQuesCommentMutation, { data, loading, error }] = usePostQuesCommentMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function usePostQuesCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostQuesCommentMutation,
    PostQuesCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    PostQuesCommentMutation,
    PostQuesCommentMutationVariables
  >(PostQuesCommentDocument, options)
}
export type PostQuesCommentMutationHookResult = ReturnType<
  typeof usePostQuesCommentMutation
>
export type PostQuesCommentMutationResult =
  Apollo.MutationResult<PostQuesCommentMutation>
export type PostQuesCommentMutationOptions = Apollo.BaseMutationOptions<
  PostQuesCommentMutation,
  PostQuesCommentMutationVariables
>
export const UpdateQuesCommentDocument = gql`
  mutation updateQuesComment($quesId: ID!, $commentId: ID!, $body: String!) {
    editQuesComment(quesId: $quesId, commentId: $commentId, body: $body) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export type UpdateQuesCommentMutationFn = Apollo.MutationFunction<
  UpdateQuesCommentMutation,
  UpdateQuesCommentMutationVariables
>

/**
 * __useUpdateQuesCommentMutation__
 *
 * To run a mutation, you first call `useUpdateQuesCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuesCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuesCommentMutation, { data, loading, error }] = useUpdateQuesCommentMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      commentId: // value for 'commentId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateQuesCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateQuesCommentMutation,
    UpdateQuesCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateQuesCommentMutation,
    UpdateQuesCommentMutationVariables
  >(UpdateQuesCommentDocument, options)
}
export type UpdateQuesCommentMutationHookResult = ReturnType<
  typeof useUpdateQuesCommentMutation
>
export type UpdateQuesCommentMutationResult =
  Apollo.MutationResult<UpdateQuesCommentMutation>
export type UpdateQuesCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateQuesCommentMutation,
  UpdateQuesCommentMutationVariables
>
export const RemoveQuesCommentDocument = gql`
  mutation removeQuesComment($quesId: ID!, $commentId: ID!) {
    deleteQuesComment(quesId: $quesId, commentId: $commentId)
  }
`
export type RemoveQuesCommentMutationFn = Apollo.MutationFunction<
  RemoveQuesCommentMutation,
  RemoveQuesCommentMutationVariables
>

/**
 * __useRemoveQuesCommentMutation__
 *
 * To run a mutation, you first call `useRemoveQuesCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuesCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuesCommentMutation, { data, loading, error }] = useRemoveQuesCommentMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useRemoveQuesCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveQuesCommentMutation,
    RemoveQuesCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveQuesCommentMutation,
    RemoveQuesCommentMutationVariables
  >(RemoveQuesCommentDocument, options)
}
export type RemoveQuesCommentMutationHookResult = ReturnType<
  typeof useRemoveQuesCommentMutation
>
export type RemoveQuesCommentMutationResult =
  Apollo.MutationResult<RemoveQuesCommentMutation>
export type RemoveQuesCommentMutationOptions = Apollo.BaseMutationOptions<
  RemoveQuesCommentMutation,
  RemoveQuesCommentMutationVariables
>
export const AddAnswerDocument = gql`
  mutation addAnswer($quesId: ID!, $body: String!) {
    postAnswer(quesId: $quesId, body: $body) {
      ...AnswerDetails
    }
  }
  ${AnswerDetailsFragmentDoc}
`
export type AddAnswerMutationFn = Apollo.MutationFunction<
  AddAnswerMutation,
  AddAnswerMutationVariables
>

/**
 * __useAddAnswerMutation__
 *
 * To run a mutation, you first call `useAddAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAnswerMutation, { data, loading, error }] = useAddAnswerMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useAddAnswerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddAnswerMutation,
    AddAnswerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddAnswerMutation, AddAnswerMutationVariables>(
    AddAnswerDocument,
    options
  )
}
export type AddAnswerMutationHookResult = ReturnType<
  typeof useAddAnswerMutation
>
export type AddAnswerMutationResult = Apollo.MutationResult<AddAnswerMutation>
export type AddAnswerMutationOptions = Apollo.BaseMutationOptions<
  AddAnswerMutation,
  AddAnswerMutationVariables
>
export const UpdateAnswerDocument = gql`
  mutation updateAnswer($quesId: ID!, $ansId: ID!, $body: String!) {
    editAnswer(quesId: $quesId, ansId: $ansId, body: $body) {
      ...AnswerDetails
    }
  }
  ${AnswerDetailsFragmentDoc}
`
export type UpdateAnswerMutationFn = Apollo.MutationFunction<
  UpdateAnswerMutation,
  UpdateAnswerMutationVariables
>

/**
 * __useUpdateAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnswerMutation, { data, loading, error }] = useUpdateAnswerMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateAnswerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAnswerMutation,
    UpdateAnswerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateAnswerMutation,
    UpdateAnswerMutationVariables
  >(UpdateAnswerDocument, options)
}
export type UpdateAnswerMutationHookResult = ReturnType<
  typeof useUpdateAnswerMutation
>
export type UpdateAnswerMutationResult =
  Apollo.MutationResult<UpdateAnswerMutation>
export type UpdateAnswerMutationOptions = Apollo.BaseMutationOptions<
  UpdateAnswerMutation,
  UpdateAnswerMutationVariables
>
export const RemoveAnswerDocument = gql`
  mutation removeAnswer($quesId: ID!, $ansId: ID!) {
    deleteAnswer(quesId: $quesId, ansId: $ansId)
  }
`
export type RemoveAnswerMutationFn = Apollo.MutationFunction<
  RemoveAnswerMutation,
  RemoveAnswerMutationVariables
>

/**
 * __useRemoveAnswerMutation__
 *
 * To run a mutation, you first call `useRemoveAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAnswerMutation, { data, loading, error }] = useRemoveAnswerMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *   },
 * });
 */
export function useRemoveAnswerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveAnswerMutation,
    RemoveAnswerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveAnswerMutation,
    RemoveAnswerMutationVariables
  >(RemoveAnswerDocument, options)
}
export type RemoveAnswerMutationHookResult = ReturnType<
  typeof useRemoveAnswerMutation
>
export type RemoveAnswerMutationResult =
  Apollo.MutationResult<RemoveAnswerMutation>
export type RemoveAnswerMutationOptions = Apollo.BaseMutationOptions<
  RemoveAnswerMutation,
  RemoveAnswerMutationVariables
>
export const SubmitAnsVoteDocument = gql`
  mutation submitAnsVote($quesId: ID!, $ansId: ID!, $voteType: VoteType!) {
    voteAnswer(quesId: $quesId, ansId: $ansId, voteType: $voteType) {
      _id
      voted
      points
    }
  }
`
export type SubmitAnsVoteMutationFn = Apollo.MutationFunction<
  SubmitAnsVoteMutation,
  SubmitAnsVoteMutationVariables
>

/**
 * __useSubmitAnsVoteMutation__
 *
 * To run a mutation, you first call `useSubmitAnsVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAnsVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAnsVoteMutation, { data, loading, error }] = useSubmitAnsVoteMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *      voteType: // value for 'voteType'
 *   },
 * });
 */
export function useSubmitAnsVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitAnsVoteMutation,
    SubmitAnsVoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SubmitAnsVoteMutation,
    SubmitAnsVoteMutationVariables
  >(SubmitAnsVoteDocument, options)
}
export type SubmitAnsVoteMutationHookResult = ReturnType<
  typeof useSubmitAnsVoteMutation
>
export type SubmitAnsVoteMutationResult =
  Apollo.MutationResult<SubmitAnsVoteMutation>
export type SubmitAnsVoteMutationOptions = Apollo.BaseMutationOptions<
  SubmitAnsVoteMutation,
  SubmitAnsVoteMutationVariables
>
export const SubmitAcceptAnsDocument = gql`
  mutation submitAcceptAns($quesId: ID!, $ansId: ID!) {
    acceptAnswer(quesId: $quesId, ansId: $ansId) {
      _id
      acceptedAnswer
    }
  }
`
export type SubmitAcceptAnsMutationFn = Apollo.MutationFunction<
  SubmitAcceptAnsMutation,
  SubmitAcceptAnsMutationVariables
>

/**
 * __useSubmitAcceptAnsMutation__
 *
 * To run a mutation, you first call `useSubmitAcceptAnsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAcceptAnsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAcceptAnsMutation, { data, loading, error }] = useSubmitAcceptAnsMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *   },
 * });
 */
export function useSubmitAcceptAnsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitAcceptAnsMutation,
    SubmitAcceptAnsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SubmitAcceptAnsMutation,
    SubmitAcceptAnsMutationVariables
  >(SubmitAcceptAnsDocument, options)
}
export type SubmitAcceptAnsMutationHookResult = ReturnType<
  typeof useSubmitAcceptAnsMutation
>
export type SubmitAcceptAnsMutationResult =
  Apollo.MutationResult<SubmitAcceptAnsMutation>
export type SubmitAcceptAnsMutationOptions = Apollo.BaseMutationOptions<
  SubmitAcceptAnsMutation,
  SubmitAcceptAnsMutationVariables
>
export const PostAnsCommentDocument = gql`
  mutation postAnsComment($ansId: ID!, $body: String!) {
    addAnsComment(ansId: $ansId, body: $body) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export type PostAnsCommentMutationFn = Apollo.MutationFunction<
  PostAnsCommentMutation,
  PostAnsCommentMutationVariables
>

/**
 * __usePostAnsCommentMutation__
 *
 * To run a mutation, you first call `usePostAnsCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostAnsCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postAnsCommentMutation, { data, loading, error }] = usePostAnsCommentMutation({
 *   variables: {
 *      ansId: // value for 'ansId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function usePostAnsCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostAnsCommentMutation,
    PostAnsCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    PostAnsCommentMutation,
    PostAnsCommentMutationVariables
  >(PostAnsCommentDocument, options)
}
export type PostAnsCommentMutationHookResult = ReturnType<
  typeof usePostAnsCommentMutation
>
export type PostAnsCommentMutationResult =
  Apollo.MutationResult<PostAnsCommentMutation>
export type PostAnsCommentMutationOptions = Apollo.BaseMutationOptions<
  PostAnsCommentMutation,
  PostAnsCommentMutationVariables
>
export const UpdateAnsCommentDocument = gql`
  mutation updateAnsComment($ansId: ID!, $commentId: ID!, $body: String!) {
    editAnsComment(ansId: $ansId, commentId: $commentId, body: $body) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export type UpdateAnsCommentMutationFn = Apollo.MutationFunction<
  UpdateAnsCommentMutation,
  UpdateAnsCommentMutationVariables
>

/**
 * __useUpdateAnsCommentMutation__
 *
 * To run a mutation, you first call `useUpdateAnsCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnsCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnsCommentMutation, { data, loading, error }] = useUpdateAnsCommentMutation({
 *   variables: {
 *      ansId: // value for 'ansId'
 *      commentId: // value for 'commentId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateAnsCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAnsCommentMutation,
    UpdateAnsCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateAnsCommentMutation,
    UpdateAnsCommentMutationVariables
  >(UpdateAnsCommentDocument, options)
}
export type UpdateAnsCommentMutationHookResult = ReturnType<
  typeof useUpdateAnsCommentMutation
>
export type UpdateAnsCommentMutationResult =
  Apollo.MutationResult<UpdateAnsCommentMutation>
export type UpdateAnsCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateAnsCommentMutation,
  UpdateAnsCommentMutationVariables
>
export const RemoveAnsCommentDocument = gql`
  mutation removeAnsComment($ansId: ID!, $commentId: ID!) {
    deleteAnsComment(ansId: $ansId, commentId: $commentId)
  }
`
export type RemoveAnsCommentMutationFn = Apollo.MutationFunction<
  RemoveAnsCommentMutation,
  RemoveAnsCommentMutationVariables
>

/**
 * __useRemoveAnsCommentMutation__
 *
 * To run a mutation, you first call `useRemoveAnsCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAnsCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAnsCommentMutation, { data, loading, error }] = useRemoveAnsCommentMutation({
 *   variables: {
 *      ansId: // value for 'ansId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useRemoveAnsCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveAnsCommentMutation,
    RemoveAnsCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveAnsCommentMutation,
    RemoveAnsCommentMutationVariables
  >(RemoveAnsCommentDocument, options)
}
export type RemoveAnsCommentMutationHookResult = ReturnType<
  typeof useRemoveAnsCommentMutation
>
export type RemoveAnsCommentMutationResult =
  Apollo.MutationResult<RemoveAnsCommentMutation>
export type RemoveAnsCommentMutationOptions = Apollo.BaseMutationOptions<
  RemoveAnsCommentMutation,
  RemoveAnsCommentMutationVariables
>
export const FetchQuestionsDocument = gql`
  query fetchQuestions(
    $sortBy: SortByType!
    $page: Int!
    $limit: Int!
    $filterByTag: String
    $filterBySearch: String
  ) {
    getQuestions(
      sortBy: $sortBy
      page: $page
      limit: $limit
      filterByTag: $filterByTag
      filterBySearch: $filterBySearch
    ) {
      next {
        page
      }
      previous {
        page
      }
      questions {
        _id
        author {
          ...AuthorDetails
        }
        title
        body
        tags
        points
        views
        createdAt
        updatedAt
        answerCount
      }
    }
  }
  ${AuthorDetailsFragmentDoc}
`

/**
 * __useFetchQuestionsQuery__
 *
 * To run a query within a React component, call `useFetchQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchQuestionsQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filterByTag: // value for 'filterByTag'
 *      filterBySearch: // value for 'filterBySearch'
 *   },
 * });
 */
export function useFetchQuestionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchQuestionsQuery,
    FetchQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchQuestionsQuery, FetchQuestionsQueryVariables>(
    FetchQuestionsDocument,
    options
  )
}
export function useFetchQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchQuestionsQuery,
    FetchQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchQuestionsQuery, FetchQuestionsQueryVariables>(
    FetchQuestionsDocument,
    options
  )
}
export type FetchQuestionsQueryHookResult = ReturnType<
  typeof useFetchQuestionsQuery
>
export type FetchQuestionsLazyQueryHookResult = ReturnType<
  typeof useFetchQuestionsLazyQuery
>
export type FetchQuestionsQueryResult = Apollo.QueryResult<
  FetchQuestionsQuery,
  FetchQuestionsQueryVariables
>
export const FetchQuestionDocument = gql`
  query fetchQuestion($quesId: ID!) {
    viewQuestion(quesId: $quesId) {
      _id
      author {
        ...AuthorDetails
      }
      title
      body
      tags
      points
      views
      createdAt
      updatedAt
      answers {
        ...AnswerDetails
      }
      author {
        ...AuthorDetails
      }
      comments {
        ...CommentDetails
      }
      acceptedAnswer
      voted
    }
  }
  ${AuthorDetailsFragmentDoc}
  ${AnswerDetailsFragmentDoc}
  ${CommentDetailsFragmentDoc}
`

/**
 * __useFetchQuestionQuery__
 *
 * To run a query within a React component, call `useFetchQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchQuestionQuery({
 *   variables: {
 *      quesId: // value for 'quesId'
 *   },
 * });
 */
export function useFetchQuestionQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchQuestionQuery,
    FetchQuestionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchQuestionQuery, FetchQuestionQueryVariables>(
    FetchQuestionDocument,
    options
  )
}
export function useFetchQuestionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchQuestionQuery,
    FetchQuestionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchQuestionQuery, FetchQuestionQueryVariables>(
    FetchQuestionDocument,
    options
  )
}
export type FetchQuestionQueryHookResult = ReturnType<
  typeof useFetchQuestionQuery
>
export type FetchQuestionLazyQueryHookResult = ReturnType<
  typeof useFetchQuestionLazyQuery
>
export type FetchQuestionQueryResult = Apollo.QueryResult<
  FetchQuestionQuery,
  FetchQuestionQueryVariables
>
export const FetchUserDocument = gql`
  query fetchUser($username: String!) {
    getUser(username: $username) {
      _id
      username
      role
      createdAt
      rep
      totalQuestions
      totalAnswers
      recentQuestions {
        _id
        title
        points
        createdAt
      }
      recentAnswers {
        _id
        title
        points
        createdAt
      }
    }
  }
`

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFetchUserQuery(
  baseOptions: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(
    FetchUserDocument,
    options
  )
}
export function useFetchUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserQuery,
    FetchUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(
    FetchUserDocument,
    options
  )
}
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>
export type FetchUserLazyQueryHookResult = ReturnType<
  typeof useFetchUserLazyQuery
>
export type FetchUserQueryResult = Apollo.QueryResult<
  FetchUserQuery,
  FetchUserQueryVariables
>
export const FetchAllTagsDocument = gql`
  query fetchAllTags {
    getAllTags {
      tagName
      count
    }
  }
`

/**
 * __useFetchAllTagsQuery__
 *
 * To run a query within a React component, call `useFetchAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchAllTagsQuery,
    FetchAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchAllTagsQuery, FetchAllTagsQueryVariables>(
    FetchAllTagsDocument,
    options
  )
}
export function useFetchAllTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchAllTagsQuery,
    FetchAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchAllTagsQuery, FetchAllTagsQueryVariables>(
    FetchAllTagsDocument,
    options
  )
}
export type FetchAllTagsQueryHookResult = ReturnType<
  typeof useFetchAllTagsQuery
>
export type FetchAllTagsLazyQueryHookResult = ReturnType<
  typeof useFetchAllTagsLazyQuery
>
export type FetchAllTagsQueryResult = Apollo.QueryResult<
  FetchAllTagsQuery,
  FetchAllTagsQueryVariables
>
export const FetchAllUsersDocument = gql`
  query fetchAllUsers {
    getAllUsers {
      _id
      username
      createdAt
    }
  }
`

/**
 * __useFetchAllUsersQuery__
 *
 * To run a query within a React component, call `useFetchAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchAllUsersQuery,
    FetchAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(
    FetchAllUsersDocument,
    options
  )
}
export function useFetchAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchAllUsersQuery,
    FetchAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(
    FetchAllUsersDocument,
    options
  )
}
export type FetchAllUsersQueryHookResult = ReturnType<
  typeof useFetchAllUsersQuery
>
export type FetchAllUsersLazyQueryHookResult = ReturnType<
  typeof useFetchAllUsersLazyQuery
>
export type FetchAllUsersQueryResult = Apollo.QueryResult<
  FetchAllUsersQuery,
  FetchAllUsersQueryVariables
>
