import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MasterLayout from '../core/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue, WithChildren } from '../core/utils/helpers'
import DashboardPageBridge from '../pages/dashboard/DashboardPage'
import TicketsPage from '../pages/tickets/TicketsPage'

const PrivateRoutes = () => {
    // Lazy loading không còn cần thiết vì chúng ta đã cập nhật cấu trúc
    // Ticket module được import qua TicketsPage

    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard' />} />
                {/* Pages */}
                <Route path='dashboard' element={<DashboardPageBridge />} />
                {/* Tickets page sử dụng component đã tạo */}
                <Route path='crafted/pages/ticket/*' element={<TicketsPage />} />
                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
    const baseColor = getCSSVariableValue('--bs-primary') || '#3699FF'
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
