import Button from '../Button/Button.jsx';

const ProfileActions = ({
  isOwnProfile,
  isFollowing,
  loading,
  onLogoutClick,
  onFollow,
  onUnfollow,
}) => {
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
          <Button variant={'primary'} onClick={onLogoutClick}>
            Log Out
          </Button>
        </>
      ) : isFollowing ? (
        <Button variant={'primary'} onClick={onUnfollow}>
          Following
        </Button>
      ) : (
        <Button variant={'primary'} onClick={onFollow}>
          Follow
        </Button>
      )}
    </>
  );
};

export default ProfileActions;
