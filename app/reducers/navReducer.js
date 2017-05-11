import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigator/appNavigator'

const initialNavState = AppNavigator
                        .router
                        .getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'))

export default function navigatorReducer(state = initialNavState, action){
    const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}