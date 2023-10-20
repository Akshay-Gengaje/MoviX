import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import "./styles.scss";
import useFetch from "../../hooks/useFetch";

function Details() {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: loadingCredits } = useFetch(`/${mediaType}/${id}/credits`);
  console.log("video : ", data);
  console.log("Credits : ", credits);
  return <div>
    <DetailsBanner video={data?.result?.[0]} crew={credits?.crew} />
  </div>;
}

export default Details;
