import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./store/features/home/HomeSlice";
import './App.scss'
function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    apiTesting();
  }, []);

  const {url} = useSelector((state) => state.home);

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };
  return (
    <>
      <h1>App</h1>
      <p>{url?.total_pages}</p> 
    </>
  );
}

export default App;
