import { useEffect, useState } from "react";
import "./App.css";
import {
  BsGithub,
  BsCoin
} from "react-icons/bs";
import { SiOpensea } from "react-icons/si";
import {
  Divider,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { Dapp } from "./components/Dapp";
import {Personal} from "./components/Personal"; 
import {MarketPlace} from "./components/MarketPlace";
import MusicPlayer from "./components/MusicGenerate";
import { AccountBookOutlined, ControlOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import {Button, Space} from "antd";
import { GenerateMusicPage } from "./components/GenerateMusicPage";
const SELECTED =
  " to-orange-300 bg-gradient-to-tr from-orange-500 w-5/6 text-white  p-3 rounded-md";
const UNSELECTED =
  "text-white p-3 rounded-md w-5/6 hover:bg-gray-600 hover:translate-x-2 transition";
function App() {
  const [moodID, setMoodId] = useState('') ?? "default";
  const [isLoading, setIsLoading] = useState(true);
  
  const [authentic, setAuthentic] = useState(() => {
    const saved = sessionStorage.getItem("authentic");
    return saved;
  });
  const [address, setAddress] = useState(() => {
    const saved = sessionStorage.getItem("selectAddress") ?? "default";
    return saved;
  });
  useEffect(() => {
    setAuthentic(sessionStorage.getItem("authentic"));
  }, [authentic]);
  useEffect(() => {
    setAuthentic(sessionStorage.getItem("selectAddress"));
    console.log(address);
  }, [address]);

  const testFinished = () =>{
    axios.post(
      "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/generationFinished"
      ,
      {
        headers: {'Authorization': authentic}
      }
    ).then(function (res) {
      console.log(res.data)
    })
  }
  const selectTag = (tag) =>{
    event.preventDefault();
    setInputMood(tag);
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="node_modules/highlight.js/styles/stackoverflow-light.css"
      ></link>
      <div className="grid grid-cols-10 w-full m-auto min-h-screen  font-sans bg-slate-50 ">
        <div className=" m-4 col-span-2 bg-sky-950 rounded-2xl" style={{ margin: "12px", width: "230px", height: "96%", position:"fixed" }}>
          <div className=" px-10 py-8 flex justify-between">
            <Icon
              mt={1.5}
              mr={2}
              as={SiOpensea}
              w={10}
              h={10}
              color="orange.400"
            />
            <div>
             <p id="emotune_title">Emotune</p>
            </div>
          </div>
          <Divider />
          <div
            className="side-menu-item space-y-4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10%",
            }}
          >
            {window.location.pathname == "/" ? (
              <a href="/" className={SELECTED}>
                Overview
              </a>
            ) : (
              <a href="/" className={UNSELECTED}>
                Overview
              </a>
            )}
            {window.location.pathname == "/music" ? (
              <a href="/music" className={SELECTED}>
                Generate Music
              </a>
            ) : (
              <a href="/music" className={UNSELECTED}>
                 Generate Music
              </a>
            )}

            {window.location.pathname == "/market" ? (
              <a href="/market" className={SELECTED}>
                Music Market
              </a>
            ) : (
              <a href="/market" className={UNSELECTED}>
                Music Market
              </a>
            )}
            {window.location.pathname == "/setting" ? (
              <a
                href="/setting"
                className="bg-orange-400 w-5/6 transition-transform text-white p-3 rounded-md "
              >
                My wallet
              </a>
            ) : (
              <a href="/setting" className={UNSELECTED}>
                My wallet
              </a>
            )}
          </div>
        </div>
         <div id="right_block">
            <div className="flex-col space-y-4 px-8 py-8">
              {window.location.pathname == "/" && (
                <>
            <header className="pb-4 p-4 pr-10 flex justify-between">
                <div>
              <h2 className=" text-5xl font-bold font bg-gradient-to-r bg-clip-text text-transparent from-orange-500 to-orange-300">
              Minting NFT for Generated Emotion-driven  Music
              </h2>
              <div className="overview_box">
                <h3 className="text-3xl font-bold">What is EmoTune?</h3>
                <p id="description_first">EmoTune uses AI model to generate music based on the inputs of your emotions or feelings.
                You can also use our service to cast your music into NFTs, and trade in marketplace.</p>
              </div>

              <div className="overview_box">
                <Space className="icon1">
                  <AccountBookOutlined  />
                </Space>
                <div className="text_box">
                  <h3 className="little_title">Connect to your Metamask wallet</h3>
                  <p className="description">EmoTune is an application built on the blockchain, which requires users to log in using the MetaMask wallet.</p>
                </div>
              </div>
              
              <div className="overview_box">
                <Space className="icon1">
                  <ControlOutlined />
                </Space>
                <div className="text_box">
                  <h3 className="little_title">Create your own music</h3>
                  <p className="description">Write down your feelings. You will get your own music within minutes.</p>
                </div>
              </div>

              <div className="overview_box">
                <Space className="icon1">
                <MoneyCollectOutlined />
                </Space>
                <div className="text_box">
                  <h3 className="little_title">Mint and trade</h3>
                  <p className="description">You can easily cast your music into NFTs, and trade with other EmoTune users in marketplace.</p>
                </div>
              </div>
              

              <Space wrap>
              <a href="/setting"><Button id="start_button" type="primary">Start exploring EmoTune</Button></a>
              </Space>
            </div>
            
            <IconButton
              variant={"ghost"}
              _hover={{ bgColor: "none" }}
              icon={<BsGithub size={"lg"} />}
              size="lg"
              m={0}
              p={0}
            />
          </header>
          </> 
              )}
              {window.location.pathname == "/music" && (
                <>
                <GenerateMusicPage authentic={authentic}></GenerateMusicPage>
                </>
              )}
              {window.location.pathname == "/market" && (
                <>
                  <MarketPlace address={address} authentic={authentic}></MarketPlace>
                </>
              )}
              {window.location.pathname == "/setting" && address == "default" && (
                
                  <>
                    <Dapp></Dapp> 
                  </>
               
              )}
              {window.location.pathname == "/setting" && address != "default" && (
                <>
                <Personal address={address} authentic={authentic}></Personal>
                </>
              )}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
