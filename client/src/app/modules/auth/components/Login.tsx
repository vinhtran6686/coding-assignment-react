import { useState } from 'react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { useAuth } from '../core/Auth' 

// MUI imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'john@example.com',
  password: '123456',
} 

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await login(values.email, values.password)
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: 'auto', zIndex: 2 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
        sx={{ width: '100%' }}
      >
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your Account Login
          </Typography>
        </Box>

        {/* Status Messages */}
        {formik.status ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {formik.status}
          </Alert>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            Use account <strong>john@example.com</strong> and password <strong>123456</strong> to
            continue. Or <strong>sarah@example.com</strong> and password <strong>123456</strong> to
            continue.
          </Alert>
        )}

        {/* Email Field */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Forgot Password Link */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Link to='/auth/forgot-password' style={{ textDecoration: 'none' }}>
            <Typography color="primary">Forgot Password?</Typography>
          </Link>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            id="kt_sign_in_submit"
            disabled={formik.isSubmitting || !formik.isValid}
            sx={{ py: 1.5 }}
          >
            {!loading ? (
              <Typography>Continue</Typography>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Please wait...</Typography>
                <CircularProgress size={20} color="inherit" />
              </Stack>
            )}
          </Button>
        </Box>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Not a Member yet?{' '}
            <Link to='/auth/registration' style={{ textDecoration: 'none' }}>
              <Typography component="span" color="primary">
                Sign up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
