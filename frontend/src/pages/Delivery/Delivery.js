import React, { useRef, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Image } from '@chakra-ui/react'
import HashLoader from "react-spinners/HashLoader";
import './delivery.css'

const Delivery = () => {
    const Line = useRef(null);
    const text = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            Line.current?.classList.add('lineon')
            text.current?.classList.add('titleon');
        }, 5)
        return () => {
        }
    }, [])
    return (<>
        <Helmet>
            <title>Livraison</title>
        </Helmet>
        <div className='Content1'>
            <div className='text'>
                <h1>
                    Livraisons en Tunisie
                </h1>
                <p style={{
                    width: "80%"
                }} >
                    <p style={{ textIndent: 20, marginTop: 20 }}>
                        Ardust  livre partout en Tunisie jusqu’à votre porte. Ardust  collabore avec des transporteurs professionnels pour garantir la livraison dans les meilleurs délais et aux meilleurs tarifs. Nous vous garantissons une livraison sans dégâts sinon nous prenons à notre charge tout changement causé par la dégradation.
                        La livraison en Tunisie est gratuite à partir de <bold>500 TND</bold> d'achats
                    </p>
                    <br></br>
                    <h3>Délai et modes de livraison</h3>
                    <div style={{ paddingLeft: 20, marginTop: 5, marginBottom: 20 }}>
                        La livraison est effectuée selon les modes suivants :
                        <lu>
                            <li>Livraison par Rapid-Post</li>
                            <li>Livraison par transporteur express en journée ouvrable (de 8h à 17h00 du lundi au vendredi). Prévoyez d'être chez vous aux heures ouvrées ou de vous faire livrer sur le lieu de travail.</li>
                            <li>La livraison sera effectuée dans le délai indiqué lors de la commande et ce sur toute la Tunisie.</li>
                        </lu>
                        <br />


                        <h3>Livraison par transporteur</h3>
                        <br />
                        Le délai d'acheminement par le transporteur privé est le suivant : entre 2 et 5 jours pour les produits en stock et entre 5 et 10 jours pour les produits en pré-commande.
                        Livraison par transporteur express à votre adresse (professionnelle ou personnelle) : livraison vers une adresse de destination en Tunisie.
                        <br />
                        <br />
                        <h3>Livraison Rapid-Post (articles de petites et moyennes tailles) </h3>
                        <br />
                        Le délai de livraison par Rapid-Post est de 24h sur tout le territoire national. Une notification est déposée chez vous et vous pouvez récupérer le colis au bureau Rapid-Post qui dessert votre commune dans un délai maximum de 15 jours. Le tarif est de 7,5 TND pour le premier kilo et ensuite +1 TND par kilo supplémentaire.
                    </div>
                </p>
            </div>
            <div className='imagecontainer'>
                <div className='Imageabt'>
                    <Image className='mImage' boxSize='400px' objectFit="cover" src='https://i.ibb.co/nn7rLr4/47-282-cover.jpg' alt="Segun Adebayo" />
                </div>
            </div>
        </div>
        <div className='Content2'>
            <div className='imagecontainer'>
                <div className='Imageabt'>
                    <Image className='mImage' boxSize='400px' objectFit="cover" src='https://i.ibb.co/ZHpDX8y/shipping.jpg' alt="Segun Adebayo" />
                </div>
            </div>
            <div className='text'>
                <p style={{
                    width: "80%"
                }}>
                    <h1>
                        Livraisons internationales
                    </h1>
                    <br />
                    Les frais de traitement et d’expédition sont calculés en fonction du poids de votre commande et du pays de destination.
                    <br />
                    Livraison par DHL à l’adresse que vous nous indiquez à l’étranger :
                    Pour un colis de poids inférieur à 1 kg:<br/><br/>
                    <ul style={{marginLeft : 30}}>
                    <li>35 TND TTC en Europe, Afrique du Nord et Moyen Orient</li>
                    <li>45 TND TTC pour le reste du monde</li>
                    </ul>
                    <br/>
                    Pour chaque kilo supplémentaire 10 TND TTC vous seront facturés
                    Nous pouvons assurer ces livraisons sur demande, mais nous ne pouvons pas assurer le suivi des réclamations avec DHL.
                    Pour plus d’informations, veuillez contacter notre service clientèle.
                </p>
            </div>
        </div>
    </>

    )
}

export default Delivery
