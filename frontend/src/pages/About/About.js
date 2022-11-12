import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Image } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";

import ReactPlayer from "react-player";
import "./aboutcss.css";

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
const About = () => {
  const Line = useRef(null);
  const text = useRef(null);
  const size = useWindowSize();
  const [videoReady, setVideoReady] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      Line.current?.classList.add("lineon");
      text.current?.classList.add("titleon");
    }, 5);
    return () => {};
  }, []);
  return (
    <>
      <Helmet>
        <title>À propos</title>
      </Helmet>
      <div className="Content1">
        <div className="text">
          <h1>Ardust</h1>
          <p
            style={{
              width: "100%",
            }}
          >
            Le concept Ardsut est un atelier de sociale et solidaire
            collaboratif situé à Gabès, à coté de la cité universitaire.
            <br></br>
            <br></br>
            La notion d’échange de savoir et la recherche de méthodes
            pédagogiques alternatives sont au cœur de cette démarche. Nos
            créations sont toutes fabriquées à partir de matériaux issus du
            recyclage et principalement le bois de palettes. La création de
            mobilier sur-mesure permet également de répondre parfaitement à la
            demande du client que ce soit :
            <div style={{ marginTop: 5, marginBottom: 20 }}>
              <lu>
                <li>
                  Pour la réalisation d’une exposition permanente ou temporaire
                </li>
                <li>
                  Pour a ménager un stand ou une boutique de manière responsable
                </li>
                <li>En intérieur ou en extérieur</li>
                <li>
                  Pour personnaliser un meuble que nous proposons en petite
                  série (dimensions, couleurs….)
                </li>
              </lu>
            </div>
          </p>
        </div>
        <div className="video-container">
          <center
            style={{ marginTop: 50, maxWidth: size.width, overflow: "hidden" }}
          >
            {
              <div style={{ opacity: videoReady ? 1 : 1 }}>
                <ReactPlayer
                  url={"https://www.youtube.com/watch?v=Go02mzCxQSs"}
                  light={true}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                  width={400}
                  playing={true}
                />
              </div>
            }
          </center>
        </div>
      </div>

      <div className="Content2">
        <div className="imagecontainer">
          <div className="Imageabt">
            <Image
              className="mImage"
              boxSize="400px"
              objectFit="cover"
              src="https://i.ibb.co/bmtbLr4/DSC00220.jpg"
              alt="Segun Adebayo"
            />
          </div>
        </div>
        <div className="text">
          <p
            style={{
              width: "80%",
            }}
          >
            <h1>Objectifs</h1>
            <br />
            Ce projet est mené par l’Organisation Volonté et Citoyenneté{" "}
            <b>OVC</b> ces objectifs:
            <div
              style={{
                paddingTop: 15,
              }}
            >
              <lu>
                <li>
                  Organiser des activités culturelles et récréatives au profit
                  des adhérents
                </li>
                <li>
                  Encadrer ses adhérents pour une meilleure intégration dans la
                  vie professionnelle
                </li>
                <li>
                  Veiller à mettre sur pied des cycles de formation pour mettre
                  en exergue leurs compétences individuelles et collectives.
                </li>
                <li>
                  Veiller à la consécration des principes de la société civile.
                </li>
                <li>
                  Préparer des études et des travaux de recherche, organiser des
                  symposiums et des ateliers pour une meilleure prise de
                  conscience
                </li>
                <li>Organiser des activités à caractère social.</li>
                <li>
                  Au cours de son mandat, l’association se doit de respecter
                  l’état de droit, les règles démocratiques, le multipartisme,
                  la clarté, l’égalité, les droits des citoyens tels que
                  prescrits par la loi.
                </li>
                <li>
                  Toutes les personnes physiques, qu’elles soient tunisiennes ou
                  de nationalité étrangère peuvent être membres de l’OVC et ce,
                  après avoir pris connaissance et approuvé les principes et les
                  objectifs de l’organisation
                </li>
              </lu>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
