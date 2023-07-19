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
import dayjs from "dayjs";
import { Dapp } from "./components/Dapp"; 

const CARDBG = "bg-white rounded-lg py-4 pr-8";
const SELECTED =
  " to-orange-300 bg-gradient-to-tr from-orange-500 w-5/6 text-white  p-3 rounded-md";
const UNSELECTED =
  "text-white p-3 rounded-md w-5/6 hover:bg-gray-600 hover:translate-x-2 transition";
function App() {
  const [loading, setLoading] = useState(true);
  const [inputMood, setInputMood] = useState('');
  useEffect(() => {
  
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
  const generateMusic = () => {
    const moodID = axios.post(
      "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/createMood",
      {
        description:inputMood
      }
    )
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="node_modules/highlight.js/styles/stackoverflow-light.css"
      ></link>
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
              <a href="/market" className={UNSELECTED}>
                Music Market
              </a>
            )}
            {window.location.pathname == "/setting" ? (
              <a
                href="/setting"
                className="bg-orange-400 w-5/6 transition-transform text-white p-3 rounded-md "
              >
                Connect wallet
              </a>
            ) : (
              <a href="/setting" className={UNSELECTED}>
                Connect wallet
              </a>
            )}
          </div>
        </div>

        <div className="main col-span-8" style={{ margin: "12px" }}>
          {/* <SkeletonText isLoaded={!loading}> */}
            <div className="flex-col space-y-4 px-8 py-8">
              {window.location.pathname == "/" && (
                <>
                <header className="pb-4 p-4 pr-10 flex justify-between">
            <div>
              <h2 className=" text-5xl font-bold font bg-gradient-to-r bg-clip-text text-transparent from-orange-500 to-orange-300">
              Minting NFT for Generated Emotion-driven  Music
              </h2>
              
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
                </>
              )}
              {window.location.pathname == "/music" && (
                <>
                <div>
                    <div className="text-4xl font-bold">
                      <h2>Input or Choose Your Mood</h2>
                    </div>
                </div>
                  <body className=" flex items-center justify-center min-h-screen [&_*]:transition-all [&_*]:ease-linear [&_*]:duration-150">
                      <div className="w-full max-w-3xl">
                          <div>
                              <form className="relative flex items-centers justify-center">
                                  <input type="text" id="search" placeholder="Enter your search here" className="border-0 focus:ring-0 focus:outline-0 w-[60%] bg-slate-600 rounded-l-lg pl-4 text-sm text-slate-200" value={inputMood}
                                    onChange={e => {
                                      console.log(e.target.value);
                                      setInputMood(e.target.value);
                                    }}/>
                                  <button className="ring-4 ring-slate-600 ring-offset-[0.55rem] shadow-transparent ring-offset-slate-800 hover:ring-offset-rose-500  hover:bg-rose-500 bg-transparent rounded-[50%] active:scale-95 cursor-pointer" onClick={generateMusic}>
                                      <h2 className="rounded-full border-4 border-rose-500 w-16 h-16  text-rose-500 text-2xl text-center justify-center flex items-center font-semibold hover:border-slate-600 hover:text-slate-600">GO</h2>
                                  </button>

                                  <div className="absolute -bottom-8 left-[17%] text-sm flex border-0 focus:outline-0 focus:ring-0 text-rose-500 mt-1 cursor-pointer">
                                      <h2>Divide your input with semicolon</h2>
                                      <div className="text-lg">
                                          <iconify-icon icon="material-symbols:keyboard-arrow-down-rounded"></iconify-icon>
                                      </div>   
                                  </div>
                              </form>   
                          </div>
                      </div>
                      <script src="https://code.iconify.design/iconify-icon/1.0.3/iconify-icon.min.js"></script>
                  </body>
                </>
              )}
              {window.location.pathname == "/market" && (
                <>
                  <div>
                    <div className="text-4xl font-bold">
                      <h2>Popular Collections</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap grid grid-cols-3">
                    <div className="w-full max-w-[20rem] p-6 bg-white rounded-2xl">
                      <div>
                      <img src="https://cdn.europosters.eu/image/750/posters/aurora-borealis-i47499.jpg" alt="" className="h-40 w-full rounded-3xl object-cover object-center cursor-pointer hover:scale-105 hover:-rotate-3"/>
                      </div>
                    <div className="flex items-center py-4 justify-between [&>*]:mx-2 [&>*>img]:h-20 [&>*>img]:aspect-square [&>*>img]:object-cover [&>*>img]:object-center [&>*>img]:rounded-xl [&>*>img:hover]:scale-110 [&>*>img:hover]:-rotate-12 [&>*>img]:cursor-pointer">
                  </div>
                      
                      <div className="flex items-center justify-between">
                          <h2>Collection Name</h2>
                          <div className="flex items-center justify-center gap-1 cursor-pointer">
                          <div className="text-2xl">
                          <IconButton
                            variant={"ghost"}
                            _hover={{ bgColor: "none" }}
                            icon={<BsCoin size={"sm"} />}
                            size="sm"
                            m={0}
                            p={0}
                          />
                        </div>
                          <p className="text-sm">4.56</p>
                          </div>
                      </div>
                          
                  </div>
                    <div className="w-full max-w-[20rem] p-6 bg-white rounded-2xl">
                        <div>
                          <img src="https://www.celebritycruises.com/blog/content/uploads/2022/01/most-beautiful-mountains-in-the-world-kirkjufell-iceland-1024x580.jpg" alt="" className="h-40 w-full rounded-3xl object-cover object-center cursor-pointer hover:scale-105 hover:-rotate-3"/>
                          </div>
                          <div className="flex items-center py-4 justify-between [&>*]:mx-2 [&>*>img]:h-20 [&>*>img]:aspect-square [&>*>img]:object-cover [&>*>img]:object-center [&>*>img]:rounded-xl [&>*>img:hover]:scale-110 [&>*>img:hover]:-rotate-12 [&>*>img]:cursor-pointer">

                        </div>
                      
                      <div className="flex items-center justify-between">
                          <h2>Collection Name</h2>
                          <div className="flex items-center justify-center gap-1 cursor-pointer">
                          <div className="text-xl">
                          <IconButton
                            variant={"ghost"}
                            _hover={{ bgColor: "none" }}
                            icon={<BsCoin size={"sm"} />}
                            size="sm"
                            m={0}
                            p={0}
                          />
                          </div>
                          <p className="text-sm">2.33</p>
                        </div>
                      </div>
                      
                    </div>
                  <div className="w-full max-w-[20rem] p-6 bg-white rounded-2xl">
                      <div>
                      <img src="https://www.holidify.com/images/cmsuploads/compressed/Taj_Mahal_20180814141729.png" alt="" className="h-40 w-full rounded-3xl object-cover object-center cursor-pointer hover:scale-105 hover:-rotate-3"/>
                      </div>
                      <div className="flex items-center py-4 justify-between [&>*]:mx-2 [&>*>img]:h-20 [&>*>img]:aspect-square [&>*>img]:object-cover [&>*>img]:object-center [&>*>img]:rounded-xl [&>*>img:hover]:scale-110 [&>*>img:hover]:-rotate-12 [&>*>img]:cursor-pointer">
                  </div>            
                  <div className="flex items-center justify-between">
                      <h2>Collection Name</h2>
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        <div className="text-xl">
                        <IconButton
                            variant={"ghost"}
                            _hover={{ bgColor: "none" }}
                            icon={<BsCoin size={"sm"} />}
                            size="sm"
                            m={0}
                            p={0}
                          />
                        </div>
                          <p className="text-sm">1.23</p> {/*价格*/}
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  </div>
                </>
              )}
              {window.location.pathname == "/setting" && (
                <>
                  <Dapp></Dapp>
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
