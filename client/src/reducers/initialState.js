export const initialState = {
  isLogin: { isLogin: false },
  location: { location: [1, 5] },
  loungeDetail: {},
  isAdmin: { isAdmin: false },
  reportsList: {
    reportsList: [
      { loungeId: 1, address: '코엑스앞', reportCount: 4 },
      { loungeId: 2, address: '코엑스뒤', reportCount: 3 },
      { loungeId: 3, address: '코엑스옆', reportCount: 5 },
      { loungeId: 4, address: '코엑스왼', reportCount: 6 },
      { loungeId: 5, address: '코엑스오', reportCount: 2 },
      { loungeId: 6, address: '코엑스상', reportCount: 4 },
      { loungeId: 7, address: '코엑스하', reportCount: 8 },
      { loungeId: 8, address: '코엑스좌', reportCount: 4 },
      { loungeId: 9, address: '코엑스우', reportCount: 6 },
    ],
  },
}

// // reducers
// const isLoginInitState = {
//   isLogin: false,
// }
// const locationInitState = {
//   location: [1, 5],
// }
