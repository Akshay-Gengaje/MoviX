import {  useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import './styles.scss'
import useFetch from "../../../hooks/useFetch"
import Carousle from "../../../components/carousle/Carousle"

function Trending() {
    const [endpoint, setEndpoint] = useState('day')

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Day' ? 'day' : "week")
    }
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    return (
        <div className="carousleSection">
            <ContentWrapper>
                <span className="carousleTitle">Trending</span>
                <SwitchTabs data={["Day", 'Week']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousle data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Trending