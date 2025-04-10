import { toAbsoluteUrl } from 'client/src/app/core/utils/helpers'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom' 

// MUI imports
import Box from '@mui/material/Box'

const AuthLayout = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1
                }
            }}
        >
            <Outlet />
        </Box>
    )
}

export { AuthLayout }
