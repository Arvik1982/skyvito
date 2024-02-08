import { configureStore } from "@reduxjs/toolkit";
import sliceAdds from "./reducers/sliceAdds";
import sliceReg from "./reducers/sliceReg";
import sliceError from "./reducers/sliceError";

export default configureStore({

    reducer:{
        addsRedux: sliceAdds,
        authRedux: sliceReg,
        errorRedux: sliceError,
    }

})