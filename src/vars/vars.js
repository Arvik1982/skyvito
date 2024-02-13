export const localHost =`http://localhost:8090/`
export const baseData = {
    email: '',
    password: '',
    name: 'No_Data',
    surname: '',
    city:'',
    id:'',
}
export const accessToken = String(localStorage.getItem('user_token'))
export const refreshToken = String(localStorage.getItem('user_token_refresh'))
