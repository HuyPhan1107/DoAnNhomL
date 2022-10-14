import { StoreContext } from '../store';
import { useContext } from 'react';

export const useStore = () => {
    const [state, dispatch] = useContext(StoreContext);
    return [state, dispatch];
}