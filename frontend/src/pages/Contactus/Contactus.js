import React, { useState } from 'react'
import { Image } from "@chakra-ui/react"
import { Helmet } from 'react-helmet';

import cover from './cover.jpg'
import { Input, InputGroup, InputLeftElement, Textarea, Button } from "@chakra-ui/react"
import { BsEnvelope} from 'react-icons/bs'
import { GiPositionMarker } from 'react-icons/gi'
import { HiOutlinePhone } from 'react-icons/hi'
import './contactuscss.css'
const Contactus = () => {
    const [email, setemail] = useState('')
    const [body, setbody] = useState('')
    const handlesubmit = () => {
        window.open(`mailto:ardust.tn@gmail.com?subject=Client&body=${body}`)
    }
    return (

        <div className="contactUs">
            <Helmet>
                <title>Contactez Nous</title>
            </Helmet>

            <div className="card-contact">
                <div className="sendMsg">
                    <h4>Envoyer un message</h4>
                    <div className="inputContact">
                        <InputGroup width="450px" >
                            <InputLeftElement pointerEvents="none" children={<BsEnvelope className='envolope' color="gray.300" />} />
                            <Input value={email} onChange={e => setemail(e.target.value)} type="text" placeholder="Votre adresse e-mail" />
                        </InputGroup>

                    </div>
                    <div className="textAreaCnt">
                        <Textarea value={body} onChange={e => setbody(e.target.value)} width="450px" placeholder="Comment pouvons nous vous aider" height="200px" />
                    </div>
                    <div className="contentContact">
                        <Button onClick={handlesubmit} borderRadius="90px" colorScheme="teal" variant="solid" size="180px" className="contactBtn">Envoyer</Button>
                    </div>

                </div>
                <div className="showAdrss">
                    <div className="box">
                        <div className="iconCtn"><GiPositionMarker opacity="0.8" /></div>
                        <div className="adressCtn">

                            <h3> Addresse</h3>
                            <p>
                                <a href="http://www.google.com/maps/place/33.857212,10.085276" >
                                    Boutique au Chemati, Route Matmata Km 2, Gabès, Tunisie
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconCtn"><HiOutlinePhone opacity="0.8" /></div>
                        <div className="adressCtn">
                            <h3>Appelez-nous au</h3>
                            <p className="infoCtn">(+216) 51 609 064</p>
                            <p className="infoCtn">(+216) 75 212 712</p>
                        </div>
                    </div>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.313060057304!2d10.082691950022587!3d33.85582197047224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556fd6b7c47609%3A0x2e57435b90a78b85!2sardust!5e0!3m2!1sfr!2stn!4v1651833957845!5m2!1sfr!2stn"  height="450" style={{border:0,width:"100%",margin : 0,marginTop:100}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default Contactus
