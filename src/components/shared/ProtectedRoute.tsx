import { useUserContext } from '@/contexts/UserContext';
import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


interface ProtectedRouteProps {
    role: string[];
    children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    role,
    children
}) => {
    const [user,] = useUserContext();
    if (user === null) {
        alert('Chưa đăng nhập tài khoản. Điều hướng đến trang đăng nhập.');
        return <Navigate to={'/signin'} replace />;
    }

    if (!role.includes(user.role)) {
        alert('Không được phép truy cập.');
        window.history.back();
        return null;
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;