import { useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import './styles.scss'
import useFetch from "../../../hooks/useFetch"
import Carousle from "../../../components/carousle/Carousle"

function TopRated() {
    const [endpoint, setEndpoint] = useState('movie')

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movie' ? 'movie' : "tv")
    }
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)
    return (
        <div className="carousleSection">
            <ContentWrapper>
                <span className="carousleTitle">Top Rated</span>
                <SwitchTabs data={["Movies", 'TV shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousle data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default TopRated