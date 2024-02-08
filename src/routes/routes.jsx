import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Main from'../pages/Main/Main'
import Article from "../pages/Article/Article"
import MyArticle from "../pages/MyArticle/MyArticle"
import Profile from "../pages/Profile/Profile"
import SellerProfile from "../pages/SellerProfile/SellerProfile"
import AuthorizationPage from "../pages/Autorization/AuthorizationPage"
import ProtectedRoute  from "../components/Protected/ProtectedRoutes"
import checkLoginStatus from "../functions/checkLoginStatus"

export default function AppRoutes(){
    let isLogin;
    const userData=useSelector(state=>state.authRedux.userData)
    const loginStatus = checkLoginStatus(userData)
    loginStatus.name!=='No_Data'?isLogin=true: isLogin=false
    
    return(
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/article" element={<Article/>}/>
            <Route path="/myarticle" element={<MyArticle/>}/>
            <Route path="/seller" element={<SellerProfile/>}/>
            <Route path="/login" element={<AuthorizationPage/>}/>
        <Route element ={<ProtectedRoute isAllowed={isLogin} />}>
            <Route path="/profile" element={<Profile/>}/>
        </Route>
        </Routes>
    )
}