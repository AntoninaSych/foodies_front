import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TabsList from '../TabsList/TabsList';
import ListItems from '../ListItems/ListItems';
import {
  getFavoritesApi,
  recipesFetch,
  recipesOwnFetch,
} from '../../api/recipesApi';
import {
  fetchCurrentUserFollowing,
  fetchCurrentUserFollowers,
  fetchUserFollowers,
} from '../../api/authApi';
import { errorHandler } from '../../utils/notification';
import { TABS } from '../TabsList/const';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import { CATALOG_LIMIT } from '../../const';
import Loader from '../Loader/Loader';

const ProfileContent = () => {
  const { id: userId } = useParams();
  const authUser = useSelector(selectUser);
  const isOwnProfile = authUser?.id === userId;
  const [loading, setLoading] = useState(false);
  const defaultTab = isOwnProfile ? TABS.MY_RECIPES : TABS.RECIPES;
  const isMobile = useMediaQuery('(max-width: 767px)');
  const token = useSelector(selectToken);
  const [currentTab, setCurrentTab] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = isMobile ? 8 : CATALOG_LIMIT;

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setTimeout(async () => {
        let result = [];
        try {
          setLoading(true);
          switch (currentTab) {
            case TABS.MY_RECIPES: {
              const { items } = await recipesOwnFetch(token, {
                page,
                limit,
              });
              result = items;
              break;
            }
            case TABS.RECIPES: {
              const { items } = await recipesFetch({
                page,
                limit,
                owner: userId,
              });
              result = items;
              break;
            }
            case TABS.FAVORITES: {
              result = await getFavoritesApi(token, {
                page,
                limit,
              });
              break;
            }
            case TABS.MY_FOLLOWERS: {
              result = await fetchCurrentUserFollowers(token, {
                page,
                limit,
              });
              break;
            }
            case TABS.FOLLOWING: {
              result = await fetchCurrentUserFollowing(token, {
                page,
                limit,
              });
              break;
            }

            case TABS.FOLLOWERS: {
              result = await fetchUserFollowers(token, userId, {
                page,
                limit,
              });
              break;
            }

            default: {
              result = [];
            }
          }
        } catch (error) {
          errorHandler(error, 'Error while fetching data.');
          setItems([]);
        } finally {
          setLoading(false);
        }

        if (active) {
          setItems(result);
        }
      }, 0);
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [userId, limit, page, token, currentTab]);

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [userId, defaultTab]);

  const handleOnTabChange = tab => {
    setCurrentTab(tab);
    setPage(1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <TabsList
        isOwnProfile={isOwnProfile}
        currentTab={currentTab}
        onChange={handleOnTabChange}
      />
      <ListItems
        isOwnProfile={isOwnProfile}
        currentTab={currentTab}
        items={items}
      />
    </>
  );
};

export default ProfileContent;
