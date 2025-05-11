import Button from '../Button/Button.jsx';

const ProfileActions = ({ loading, isOwnProfile, isFollowing }) => {
  const handleLogout = () => {};

  const handleFollow = () => {};
  const handleUnfollow = () => {};

  if (loading) {
    return (
      <Button variant={'primary'} disabled>
        ...
      </Button>
    );
  }

  return (
    <>
      {isOwnProfile ? (
        <>
          <Button variant={'primary'} onClick={handleLogout}>
            Log Out
          </Button>
        </>
      ) : isFollowing ? (
        <Button variant={'primary'} onClick={handleUnfollow}>
          Following
        </Button>
      ) : (
        <Button variant={'primary'} onClick={handleFollow}>
          Follow
        </Button>
      )}
    </>
  );
};

export default ProfileActions;
