import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../modules/auth';


const ProfilePage: FC = () => {
  const { currentUser } = useAuth();

  // Mock user data (would come from authentication context in a real app)
  const user = currentUser || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    role: 'Administrator',
  };

  return (
    <>
      this is profile page
      {
        currentUser?.username && JSON.stringify(currentUser)
      }
    </>
  );
};

export default ProfilePage; 