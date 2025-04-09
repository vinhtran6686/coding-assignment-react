import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MasterLayout from '../../mui-theme/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../mui-theme/assets/ts/_utils'
import { WithChildren } from '../../mui-theme/helpers'
import DashboardPage from '../pages/dashboard/DashboardPage'

const PrivateRoutes = () => {
    const TicketPage = lazy(() => import('../modules/ticket/TicketPage'))

    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard' />} />
                {/* Pages */}
                <Route path='dashboard' element={<DashboardPage />} />
                {/* Lazy Modules */}
                <Route
                    path='crafted/pages/ticket/*'
                    element={
                        <SuspensedView>
                            <TicketPage />
                        </SuspensedView>
                    }
                />
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
