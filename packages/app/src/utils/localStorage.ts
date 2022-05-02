import { Author } from '../generated/graphql'

const storageKeyToken = 'sofCloneUserKey'
const storageKeyDarkMode = 'sofCloneDarkMode'

const saveUser = (user: Author) =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user))

const loadUser = () => JSON.parse(localStorage.getItem(storageKeyToken)!)

const removeUser = () => localStorage.removeItem(storageKeyToken)

const saveDarkMode = (boolean: boolean) =>
  localStorage.setItem(storageKeyDarkMode, JSON.stringify(boolean))

const loadDarkMode = () => JSON.parse(localStorage.getItem(storageKeyDarkMode)!)

const stroage = {
  saveUser,
  loadUser,
  removeUser,
  saveDarkMode,
  loadDarkMode,
}

export default stroage
