
export const getUserPublicData = (user: any): any => {
  const { id, name, email, icons } = user
  return ({ id, name, email, icons })
}

export const getUsersPublicData = (users: any[]): any[] => {
  const usersWithoutSensitiveInfo = users.map(({ id, name, email, icons }) => ({ id, name, email, icons }))
  return usersWithoutSensitiveInfo
}
