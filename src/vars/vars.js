
export const localHost =`http://localhost:8090/`
export const baseData = {
    email: 't@ttt.tt',
    password: '',
    name: 'No_User',
    surname: '',
    city:'',
    id:'',
}
export const accessToken = String(localStorage.getItem('user_token'))
export const refreshToken = String(localStorage.getItem('user_token_refresh'))
  