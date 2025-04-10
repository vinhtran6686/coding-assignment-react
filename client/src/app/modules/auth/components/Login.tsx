import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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

type LoginFormValues = {
  email: string;
  password: string;
}

const defaultValues = {
  email: 'john@example.com',
  password: '123456',
} 

export function Login() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const { saveAuth, setCurrentUser } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<LoginFormValues>({
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = async (values: LoginFormValues) => {
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
      setLoading(false)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: 'auto', zIndex: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
        {status ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {status}
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
            label="Email"
            variant="outlined"
            placeholder="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ shrink: true }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Wrong email format'
              },
              minLength: {
                value: 3,
                message: 'Minimum 3 symbols'
              },
              maxLength: {
                value: 50,
                message: 'Maximum 50 symbols'
              }
            })}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ shrink: true }}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Minimum 3 symbols'
              },
              maxLength: {
                value: 50,
                message: 'Maximum 50 symbols'
              }
            })}
          />
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
            disabled={isSubmitting || !isValid}
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
      </Box>
    </Paper>
  )
}
