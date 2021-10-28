export default {
  virtuals: true,
  transform: (_document: any, returnedObject: any) => {
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
};