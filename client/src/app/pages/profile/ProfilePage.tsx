import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../modules/auth';


const ProfilePage: FC = () => {
  const { currentUser } = useAuth();

  // Mock user data (would come from authentication context in a real app)
  const user = currentUser || {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://placehold.co/150/4287f5/ffffff?text=JD',
  };

  return (
    <>
      <p>This is profile page</p>
      {
        currentUser && JSON.stringify(currentUser)
      }
    </>
  );
};

export default ProfilePage; 