import React, { useState, useEffect } from 'react'
import Slider from '../components/Slider'
import Cardscg from '../components/Cardscg'
import CgDiv from '../components/CgDiv'
import ProductsC from '../components/ProductsC'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ImageResponsive from 'react-image-responsive';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000';
const Home = () => {

    /*const [promoIframeSrc , setPromoIframeSrc] = useState("")

    useEffect(()=>{
       if ( ! promoIframeSrc?.length)
       {
        promoIframeSrc = await axios.get("/bannerUrl")
       }
    } ,[]);*/
    const [videoReady, setVideoReady] = React.useState(false);
    const size = useWindowSize();
    return (
        <>
            <Helmet>
                <title>Ardust</title>
            </Helmet>
            <div>
                <Slider />
                <div className='Content2'>
                    <div className='text'>
                    <h1>
                    Ardust
                    </h1>
                        
                        <div style={{  marginTop: 5, marginBottom: 20 }}>
                        <lu>
                            <li>Un atelier social et solidaire situé à Gabès. </li>
                            <li>Tous nos produits sont fabriqués à partir de matériaux recyclés, en particulier de bois de palette.</li>
                            <li>Nos créations sur-mesure vous permettent  de répondre parfaitement à vos attentes.</li>
                        </lu>
                    </div>
                    </div>
                    <div className='video-container' >    
                            <center style={{ maxWidth: size.width, overflow: "hidden" }} >
                                {
                                    <div style={{ opacity: videoReady ? 1 : 1 }} >
                                        <ReactPlayer
                                            url={"https://youtu.be/RYv753IIapM"}
                                            light={true}

                                            config={{
                                                youtube: {
                                                    playerVars: { showinfo: 1 }
                                                }
                                            }}

                                            width={Math.min(size.width, 640) - 10}
                                            playing={true}
                                        />
                                    </div>
                                }
                            </center>
                        
                    </div>
                </div>

                <div className="cards">
                    <Cardscg title='Meuble' />
                    <Cardscg title='D’ecoration' />
                    <Cardscg title='Accessoires' />
                </div>
                <CgDiv />
                <ProductsC />
            </div>
        </>
    )
}




// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}
export default Home


