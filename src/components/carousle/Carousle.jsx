import React, { useRef } from 'react'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img'
import PosterFallback from "../../assets/no-poster.png";

import './styles.scss'
import dayjs from 'dayjs';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
function Carousle({ data, loading, endpoint }) {
    const carousleContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carousleContainer.current;
        console.log("Container : ", container);
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left: scrollAmount,
            behaviour: "smooth"
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className='carousel'>
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {
                    !loading ? (

                        <div className='carouselItems' ref={carousleContainer} >
                            {
                                data?.map((item) => {
                                    const posterURL = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                    return (
                                        <div className="carouselItem"
                                            key={item.id}
                                            onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                        >
                                            <div className="posterBlock">
                                                <Img src={posterURL} />
                                                <CircleRating rating={item.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>
                                            <div className="textBlock">
                                                <div className="title">
                                                    {item.title || item.name}
                                                </div>
                                                <div className="date">
                                                    {dayjs(item.release_Date).format("MMM D,YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousle