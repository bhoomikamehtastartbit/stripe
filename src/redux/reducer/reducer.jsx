import { combineReducers } from 'redux';

import AuthSliceReducer from '../Slice/CheckAuthSlice'
import addDataSliceReducer from '../Slice/addDataSlice';
import DataSliceReducer from '../Slice/addPaymentDataSlice'
import countSliceReducer from '../Slice/countSlice'

const rootReducer = combineReducers({

    data: addDataSliceReducer,

});

export default rootReducer;
