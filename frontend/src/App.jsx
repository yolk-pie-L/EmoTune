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
const SELECTED =
  " to-orange-300 bg-gradient-to-tr from-orange-500 w-5/6 text-white  p-3 rounded-md";
const UNSELECTED =
  "text-white p-3 rounded-md w-5/6 hover:bg-gray-600 hover:translate-x-2 transition";
function App() {

  const [inputMood, setInputMood] = useState('');
  const [tasks, setTasks] = useState([]);
  const [moodID, setMoodId] = useState('') ?? "default";
  const [isLoading, setIsLoading] = useState(true);

  const [authentic, setAuthentic] = useState(() => {
    // getting stored value
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

  const generateMusic = () => {
    event.preventDefault();
    if (inputMood.trim() != '') {
      setTasks([...tasks, inputMood]);
      const response = axios.post(
      "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/createMood",
      {
        description:inputMood
      },
      {
        headers: {'Authorization': authentic}
      }
    ).then(function (res) {
      console.log(res.data)
      setMoodId(res.data);//记录moodID
    })
      setInputMood('');
    }
  }

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
                <div class="md:row-start-1 tags w-full max-w-2xl h-fit place-self-end">
        <ul class="flex gap-3 flex-wrap [&>*]:bg-white [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-full [&>*:hover]:bg-slate-900 [&>*:hover]:text-white [&>*>a]:flex [&>*>a]:items-center [&>*>a]:gap-2">
         <li><a href="" onClick={() => selectTag("Happy")}>
             <h2>Happy</h2>
             <iconify-icon icon="system-uicons:cross"></iconify-icon>
             </a></li>
         <li><a href="" onClick={() => selectTag("Sad")}>
              <h2>Sad</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
              </a></li>
          <li><a href="" onClick={() => selectTag("Crazy")}>
              <h2>Crazy</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>    
             </a></li>
           <li><a href="" onClick={() => selectTag("hiphop")}>
               <h2>hiphop</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
              </a></li>
            </ul>
        </div>
                      <div className="w-full max-w-3xl">
                          <div>
                              <form className="relative flex ">
                                  <input type="text" id="search" placeholder="Enter your search here" className="border-0 focus:ring-0 focus:outline-0 w-[60%] bg-slate-600 rounded-l-lg pl-4 text-sm text-slate-200" value={inputMood}
                                    onChange={e => {
                                      console.log(e.target.value);
                                      setInputMood(e.target.value);
                                    }}/>
                                  <button className="ring-4 ring-slate-600 ring-offset-[0.55rem] shadow-transparent ring-offset-slate-800 hover:ring-offset-rose-500  hover:bg-rose-500 bg-transparent rounded-[50%] active:scale-95 cursor-pointer" onClick={generateMusic}>
                                      <h2 className="rounded-full border-4 border-rose-500 w-16 h-16  text-rose-500 text-2xl text-center justify-center flex items-center font-semibold hover:border-slate-600 hover:text-slate-600">GO</h2>
                                  </button>

                                  <div className="absolute -bottom-8 left-[1%] text-sm flex border-0 focus:outline-0 focus:ring-0 text-rose-500 mt-1 cursor-pointer">
                                      <h2>Divide your input with semicolon</h2>
                                      <div className="text-lg">
                                          <iconify-icon icon="material-symbols:keyboard-arrow-down-rounded"></iconify-icon>
                                      </div>   
                                  </div>
                              </form>   
                          </div>
                      </div>
                      <table className="mt-4 min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">{task}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <script src="https://code.iconify.design/iconify-icon/1.0.3/iconify-icon.min.js"></script>
                  {/* </body> */}
                </>
              )}
              {window.location.pathname == "/market" && (
                <>
                  <MarketPlace address={address} authentic={authentic}></MarketPlace>
                </>
              )}
              {window.location.pathname == "/setting" && address == "default" && (
                
                  <>
                    <Dapp></Dapp> {/* Render Dapp component for the first login */}
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
