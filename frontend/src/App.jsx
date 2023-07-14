import { useEffect, useState } from "react";
import "./App.css";
import {
  BsGithub,
} from "react-icons/bs";
import { SiOpensea } from "react-icons/si";
import {
  Divider,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { Dapp } from "./components/Dapp"; 

const CARDBG = "bg-white rounded-lg py-4 pr-8";
const SELECTED =
  " to-orange-300 bg-gradient-to-tr from-orange-500 w-5/6 text-white  p-3 rounded-md";
const UNSELECTED =
  "text-white p-3 rounded-md w-5/6 hover:bg-gray-600 hover:translate-x-2 transition";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  // const [nonAccepted, setNonAccepted] = useState(0)
  
    axios
      .all([
        
      ])
      .then(
        axios.spread((...allData) => {  
          setLoading(false);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* <link
        rel="stylesheet"
        href="node_modules/highlight.js/styles/stackoverflow-light.css"
      ></link> */}
      <div className="grid grid-cols-10 w-full m-auto min-h-screen  font-sans bg-slate-50 ">
        <div className=" m-4 col-span-2 bg-sky-950 rounded-2xl">
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
              <p className="text-white text-lg font-semibold ">EmoTune</p>
              <p className="text-white decoration-wavy font-semibold">
                EmoTune
              </p>
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
              <a href="/tags" className={UNSELECTED}>
                Music Market
              </a>
            )}
            {window.location.pathname == "/setting" ? (
              <a
                href="/setting"
                className="bg-orange-400 w-5/6 transition-transform text-white p-3 rounded-md "
              >
                Setting
              </a>
            ) : (
              <a href="/setting" className={UNSELECTED}>
                Setting
              </a>
            )}
          </div>
        </div>

        <div className="main col-span-8" style={{ margin: "12px" }}>
          <header className="pb-4 p-4 pr-10 flex justify-between">
            <div>
              <h1 className=" text-5xl font-bold font bg-gradient-to-r bg-clip-text text-transparent from-orange-500 to-orange-300">
              Minting NFT for Generated Emotion-driven  Music
              </h1>
              
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
          <Divider p={0} m={0} />
          {/* <SkeletonText isLoaded={!loading}> */}
            <div className="flex-col space-y-4 px-8 py-8">
              {window.location.pathname == "/" && (
                <>
                <Dapp></Dapp>
                </>
              )}
              {window.location.pathname == "/music" && (
                <>
                  
                </>
              )}
              {window.location.pathname == "/market" && (
                <>
                  
                </>
              )}
              {window.location.pathname == "/setting" && (
                <>
                  
                </>
              )}
            </div>
          {/* </SkeletonText> */}
        </div>
      </div>
    </>
  );
}

export default App;
