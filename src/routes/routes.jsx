import { Routes, Route } from "react-router-dom"

import { useSelector } from "react-redux"
import Main from'../pages/Main/Main'
import Article from "../pages/Article/Article"
// import MyArticle from "../pages/MyArticle/MyArticle"
import Profile from "../pages/Profile/Profile"
import SellerProfile from "../pages/SellerProfile/SellerProfile"
import AuthorizationPage from "../pages/Autorization/AuthorizationPage"
import ProtectedRoute  from "../components/Protected/ProtectedRoutes"
import checkLoginStatus from "../functions/checkLoginStatus"
import ErrorPage from "../pages/Error/Error"


export default function AppRoutes(){
    let isLogin;
    const userData=useSelector(state=>state.authRedux.userData)
    const loginStatus = checkLoginStatus(userData)
    loginStatus.name==='No_User'?isLogin=false:
    !loginStatus?isLogin=false:
    loginStatus===''?isLogin=false:
    isLogin=true
    
    
    
    
    return(
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/article/:id" element={<Article/>}/>
            {/* <Route path="/myarticle" element={<MyArticle/>}/> */}
            
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/login" element={<AuthorizationPage/>}/>
        <Route element ={<ProtectedRoute isAllowed={isLogin} />}>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/seller/:id" element={<SellerProfile/>}/>
        </Route>
        </Routes>
    )
}