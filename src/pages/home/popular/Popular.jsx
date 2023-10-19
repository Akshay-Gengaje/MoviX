import { useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import './styles.scss'
import useFetch from "../../../hooks/useFetch"
import Carousle from "../../../components/carousle/Carousle"

function Popular() {
    const [endpoint, setEndpoint] = useState('movie')

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : "tv")
    }
    const { data, loading } = useFetch(`/${endpoint}/popular`)
    return (
        <div className="carousleSection">
            <ContentWrapper>
                <span className="carousleTitle">What's Popular</span>
                <SwitchTabs data={["Movies", 'TV shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousle data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Popular