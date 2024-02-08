export const localHost =`http://localhost:8090/`
export const baseData = {
    email: '',
    password: '',
    name: 'No_Data',
    surname: '',
    city:'',
    id:'',
}
export const accessToken = localStorage.getItem('user_token')
export const refreshToken = localStorage.getItem('user_token_refresh')
