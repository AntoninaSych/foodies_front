import {useEffect, useState} from "react";
import Container from "../../components/Container/Container";
import css from "./DetailUserPage.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import DetailUser from "../../components/DetailUser/DetailUser";
import Message from "../../components/Message/Message";
import {fetchCurrentUser} from "../../api/usersApi";

const DetailUserPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const data = await fetchCurrentUser(id);
        setData(data);
      } catch ({ message, status }) {
        if (status === 404) {
          setError("No data found.");
        } else {
          setError(message || "Oops, something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className={css.wrapper}>
        {error && <Message>{error}</Message>}
        {!error && data && <DetailUser data={data} />}
      </div>
    </Container>
  );
};

export default DetailUserPage;
