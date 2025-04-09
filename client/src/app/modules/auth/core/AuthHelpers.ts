/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
  
  return undefined
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(instance: typeof axios) {
  // Request interceptor to add authentication token
  instance.interceptors.request.use(
    (config: any) => {
      const auth = localStorage.getItem('auth');
      if (auth) {
        try {
          const authData = JSON.parse(auth);
          if (authData.token) {
            if (config.headers) {
              config.headers.set('Authorization', `Bearer ${authData.token}`);
            }
          }
        } catch (error) {
          console.error('Failed to parse auth data', error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle auth errors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle 401 Unauthorized errors
      if (error.response?.status === 401) {
        // Clear auth data and redirect to login page
        localStorage.removeItem('auth');
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );
} 

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
