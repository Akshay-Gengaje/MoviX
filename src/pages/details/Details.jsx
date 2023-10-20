
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import "./styles.scss";
import DetailsBanner from './DetailsBanner/DetailsBanner';


function Details() {
  // const { mediaType, id } = useParams()
  // const { data, loading } = useFetch(`/${mediaType}/${id}`);
  return <div>
    <DetailsBanner />
  </div>;
}

export default Details;
