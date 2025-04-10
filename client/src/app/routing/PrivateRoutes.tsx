import { FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MasterLayout from '../core/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue, WithChildren } from '../core/utils/helpers'
import DashboardPageBridge from '../pages/dashboard/DashboardPage'
import { TicketPage } from '../modules/ticket'

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                <Route path='auth/*' element={<Navigate to='/dashboard' />} />
                <Route path='dashboard' element={<DashboardPageBridge />} />
                <Route path='ticket/*' element={<TicketPage />} />
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
