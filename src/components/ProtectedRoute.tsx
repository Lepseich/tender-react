import { Navigate } from 'react-router-dom';
import type { IUser } from '../types';
import { required } from 'zod/v4-mini';


export interface ProtecterProps {
    user: IUser | null,
    requiredRole?: 'user' | 'company' | 'admin',
    children: React.ReactNode,
}

const ProtecredRoute = ({ user, requiredRole, children }: ProtecterProps) => {
        if (!user) {
            return <Navigate to="/login" />

        } else if (requiredRole !== null && user.role !== requiredRole) {
            return <Navigate to="/" />
        } else {
            return <>{children}</>
        }
    
}

export default ProtecredRoute;