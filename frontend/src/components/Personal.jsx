import axios from "axios";
import React, { useState, useEffect } from "react";
import MintNFTButton from "./MintNFTButton";
import WithdrawNFTButton from "./WithdrawNFTButton";
import SellNFTButton from "./SellNFTButton";
import copy from "copy-to-clipboard";
import { message } from "antd";
import MusicPlayer from "./MusicGenerate";
import {Space, Button} from 'antd';
import {RedoOutlined} from '@ant-design/icons';
export function Personal({ address, authentic }) {
    const [musicList, setMusicList] = useState([]);
    const [NFTList, setNFTList] = useState([]);
    const [activeTable, setActiveTable] = useState(true); // true为music history, false为NFTs
    useEffect(() => {
        axios.get(
            "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/getUserMoods",
            {
                headers: {'Authorization': authentic}
            }
        ).then(function (res) {
            console.log(res.data)
            setMusicList(res.data);
        })

        axios.post(
            "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/getUserNFTs",
            {
               owner_address: address
            }
        ).then(function (res) {
            console.log(res.data.items);
            setNFTList(res.data.items);
        })
    }, []);
    
    const copyName = (id) => {
        copy(id);
        message.success("Copied: " + id);
      };
    return (
        
        <div className="w-[60rem] px-6 py-10 col-span-4 place-self-center h-[40vh]">
              <div className="flex items-center justify-between mb-4">
            
                <div>
                    <img src="https://marketplace.canva.cn/KeQgQ/MAB60XKeQgQ/2/tl/canva-MAB60XKeQgQ.png" alt="" class="w-16 rounded-full aspect-square object-cover object-center hover:scale-125 transition-all ease-linear duration-300 cursor-pointer"/>
                  </div>
            </div>
                  
            <div>
                <h2 className="text-xl font-semibold">Unnamed</h2>
                <p className="text-slate-500 mb-3">{address}</p>
            </div>
              <div className="font-bold mb-4">
                <p>You can check your generating history and your NFTs here!</p>
              </div>
              <div className="p-4">
                <div className="mb-4">
                <button className="mx-2" onClick={() => setActiveTable(true)}>
                    <div className="rounded-3xl px-7 py-2 bg-[#0e192c] text-white hover:border hover:bg-white hover:text-black transition-all ease-linear duration-300 cursor-pointer"><h2>My Generating History</h2></div>
                </button>
                <button className="mx-6" onClick={() => setActiveTable(false)}>
                    <div className="rounded-3xl px-7 py-2 bg-[#0e192c] text-white hover:border hover:bg-white hover:text-black transition-all ease-linear duration-300 cursor-pointer"><h2>My NFTs</h2></div>
                </button>
                <button onClick={()=>{
                window.location.reload();
                }} s
                 >
                <RedoOutlined />
                </button>
            </div>
            </div>
            
            {activeTable == true && (
            <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Music</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                         {musicList.map((item, index) => ( 
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <MusicPlayer audio={item.music_link}></MusicPlayer>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.gen_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.token_id == null ? 'NOT MINT' : 'MINT'}</td>
                            <td className="px-6 py-4 whitespace-nowrap"> 
                            <MintNFTButton token_id= {item.token_id}
                            mood_id={item.mood_id} authentic={authentic}></MintNFTButton>
                            </td>
                        </tr>
                        ))} 
                    </tbody> 
                </table>
            )}
             {activeTable == false && (
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OwnerID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CreateID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {NFTList.map((item, index) => (
                    <tr key={index}>
                       <td className="px-6 py-4 whitespace-nowrap">
                        <Space direction="vertical">
                            {item.description}
                            <MusicPlayer audio={item.music_link}></MusicPlayer>
                        </Space>  
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" onClick={()=> copyName(item.creator_add)}>{hideMiddleDigits(item.creator_add)
                        }</td>
                        <td className="px-6 py-4 whitespace-nowrap" onClick={()=> copyName(item.creator_add)}>{hideMiddleDigits(item.owner_add)
                        }</td>
                        <td className="px-3 py-4 whitespace-nowrap">{item.isSelling == 0 ? '-' : item.price}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                        <SellNFTButton token_id= {item.token_id} isSelling={item.isSelling}></SellNFTButton>
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap">
                        <WithdrawNFTButton token_id= {item.token_id} isSelling={item.isSelling}></WithdrawNFTButton>
                        </td>
                    </tr>
                     ))}
                </tbody> 
            </table>
                )}
            </div>
    );
};

function hideMiddleDigits(id) {
    const length = id.length;
    const visibleLength = 4; // 设置保留前后可见数字的长度
    const hiddenLength = length - 2 * visibleLength;
    const visiblePart = id.slice(0, visibleLength) + ".".repeat(3) + id.slice(length - visibleLength);
    return visiblePart;
};

export default Personal;