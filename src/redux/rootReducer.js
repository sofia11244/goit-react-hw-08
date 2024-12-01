import { combineReducers } from 'redux';
import contactsReducer from './contacts/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: authReducer,
});

export default rootReducer;
//  Eğer birden fazla reducer kullanıyorsan, 
// combineReducer kullanarak tüm reducer'ları birleştirme için yardımcı