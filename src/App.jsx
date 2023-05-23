import axios from 'axios';
import './App.css'
import imgHome from "./assets/lofi.gif"
import {useState} from "react";

function App() {
    const [dataProxy , SetDataProxy] = useState([])
    const [ModalWebhook , SetModalWebhook] = useState(false)
    const [Webhook , SetWebhook] = useState({textInput:"" , proxyClick :"", items:{}})

    const SubmitProxySend = ()=> {
        axios.get('https://mtpro.xyz/api/?type=mtproto')
            .then(function (response) {
                SetDataProxy(response.data.filter((items)=>items.ping>1))
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    const SendWebHook = (data)=>{

        axios.post(data.textInput, {
            "username": "Proxy",
            "embeds": [
                {
                    "color": 967309,
                    "fields": [
                        {
                            "name": " ",
                            "value": data.proxyClick,
                            "inline": false,
                        },
                        {
                            "name": "Secret",
                            "value": data.items.secret,
                            "inline": false
                        },
                        {
                            "name": "Port",
                            "value": data.items.port,
                            "inline": false
                        },
                        {
                            "name": "Host",
                            "value": data.items.host,
                            "inline": false
                        },
                        {
                            "name": "Country",
                            "value": data.items.country,
                            "inline": false
                        },
                        {
                            "name": "Ping",
                            "value": data.items.ping,
                            "inline": false
                        }
                    ],
                }

            ]
        })
            .then(function (response) {
                console.log(response);
                SetWebhook({textInput:"" , proxyClick :"", items:{}})
                SetModalWebhook(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

  return (
    <>
        <div className="container">
            <h1 className="text-3xl"> Get daily Proxy Tel</h1>
            <div className="flex flex-col text-left mt-12 gap-3">
                <p className="text-2xl font-bold">click get proxy button and Wait until you receive Tel proxies.. some proxies don't work, test</p>
                <p className="text-xl">You can copy the proxy link or save it via the Discord webhook </p>
                <a href="https://github.com/Amirmohamadhejazi/Proxy-Tel-React">
                    <div className="flex flex-col lg:flex-row items-center mb-7">
                        <span>If you like this project, give it a star so that both my energy will increase and other people will use this project</span>
                        <img src="https://user-images.githubusercontent.com/5713670/87202985-820dcb80-c2b6-11ea-9f56-7ec461c497c3.gif" alt="git" width="30" height="30" />
                    </div>
                </a>


                {
                    dataProxy.length === 0 && <img src={imgHome} className="rounded-xl" alt="Cool-Readme" />
                }


            </div>

            <div className=" mt-5 w-full">
                <div className="flex justify-center">
                    <button onClick={SubmitProxySend}>
                        Get Proxy
                    </button>
                </div>
                {
                    dataProxy.length !== 0 ?
                        <>
                            {dataProxy.sort((a, b) => a.ping - b.ping).map((items, index)=><div className="proxy_container" key={index}>
                                {index !== 0 && <hr className="w-100" style={{borderColor:"white" , margin:"20px 0 20px 0 "}}/>}

                                <div className="grid lg:grid-cols-5 grid-cols-1 gap-2 lg:text-center text-left text-lg">
                                    <span className="truncate"  title={items.country}>Country: {items.country}</span>
                                    <span className="truncate" title={items.host}>Host: {items.host}</span>
                                    <span className="truncate"  title={items.secret}>Secret: {items.secret}</span>
                                    <span className="truncate"  title={items.port}>Port: {items.port}</span>
                                    <span className="truncate"  title={items.ping}>Ping: <span className={`${items.ping < 200 ? 'text-green-500' :"text-red-700"}`}>{items.ping}</span></span>
                                </div>
                                <div className="w-100 flex flex-col py-9 px-5	boxShadowCustom gap-2 lg:gap-0" style={{borderRadius:"10px" , marginTop:"10px"}}>
                                    <div className=" flex flex-col lg:flex-row  justify-between items-center  gap-5 lg:gap-0">
                                        <button className="w-100 bg-blue-400 lg:w-auto" onClick={()=>{SetWebhook({...Webhook, proxyClick:`tg://proxy?server=${items.host}&port=${items.port}&secret=${items.secret}`, items:items }), SetModalWebhook(true)}}>
                                            Save with Webhook Discord
                                        </button>
                                        <button className="w-100 lg:w-auto" onClick={()=>navigator.clipboard.writeText(`tg://proxy?server=${items.host}&port=${items.port}&secret=${items.secret}`)}>
                                            Copy
                                        </button>
                                    </div>


                                    <span  className=" flex justify-center ">
                                        <a  className="boxShadowCustom bg-gray-300 p-3 rounded-md text-lg font-bold " href={`tg://proxy?server=${items.host}&port=${items.port}&secret=${items.secret}`}>Go to link</a>
                                    </span>
                                </div>
                            </div>)}
                        </>
                        : <p className="mt-5">Click to get proxy</p>
                }

                <div className={`modal ${ModalWebhook && 'modal-open'}`} id="my-modal-2">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-5">Send Proxy with Webhook Discord</h3>
                        <input className="custom-Input text-black" value={Webhook.textInput} onChange={(e)=>SetWebhook({...Webhook , textInput: e.target.value})} type="text"/>
                        <div className="modal-action">
                            <div className="w-100 flex justify-between">
                                <button className="bg-red-500 " onClick={() => {SetWebhook({textInput:"" , proxyClick :"", items:{}}), SetModalWebhook(false)}}>
                                    Close
                                </button>
                                <button className="bg-green-700" onClick={()=>SendWebHook(Webhook)}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*footer*/}



                {/*<h3>Proje Proxy Tel <h3/> <a href="https://amirmohamadhejazi.github.io/proje_finall/">Link Live</a>*/}

                {/*    <h3 align="left">Open live link, and click get proxy button ... .. . Wait until you receive Tel proxies.. some proxies don't work, test</h3>*/}
                {/*    <h3 align="left">You can copy the proxy link or save it via the Discord webhook </h3>*/}

                {/*    <h3 align="left">If you like this project, give it a star so that both my energy will increase and other people will use this project <img src="https://user-images.githubusercontent.com/5713670/87202985-820dcb80-c2b6-11ea-9f56-7ec461c497c3.gif" alt="git" width="30" height="30" /></h3>*/}
                {/*    <img src="https://github.com/mayankchaudhary26/Cool-Readme-ideas/raw/master/data/lofi.gif" alt="tailwind" />*/}







                {/*    <h3 align="left">Languages and Tools:</h3>*/}
                {/*    <p align="left">*/}
                {/*        <img src="https://camo.githubusercontent.com/cda2bff49eb0cd388393e08dd91cc3cf461f095e387d3fdcb8648ab0418010aa/68747470733a2f2f692e67697068792e636f6d2f6d656469612f654e41736a4f353574506267616f72376d612f323030772e77656270" alt="css3" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/>*/}
                {/*        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>*/}
                {/*        <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>*/}
                {/*        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>*/}
                {/*        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/>*/}
                {/*        <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/>*/}
                {/*    </p>*/}


            </div>
        </div>

    </>
  )
}

export default App
