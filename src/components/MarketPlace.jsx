import axios from "axios";
import React, { useState, useEffect } from "react";
import BuyNFTButton from "./BuyNFTButton";
import {
    BsCoin
  } from "react-icons/bs";
import {
    IconButton,
} from "@chakra-ui/react";
export function MarketPlace({ address, authentic }) {
    const [marketPlace, setMarketplace] = useState([]);
    const imageLinks = [
        "https://cdn.europosters.eu/image/750/posters/aurora-borealis-i47499.jpg",
        "https://www.celebritycruises.com/blog/content/uploads/2022/01/most-beautiful-mountains-in-the-world-kirkjufell-iceland-1024x580.jpg",
        "https://www.holidify.com/images/cmsuploads/compressed/Taj_Mahal_20180814141729.png"
    ]
    useEffect(() => {
        axios.post(
        "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/viewMarketplace"
        ).then(function (res) {
        setMarketplace(res.data.items);
        console.log(res.data.items);
        });
    }, []);
    return (
        <>
        {marketPlace.length > 0 && (
           <><div>
                    <div className="text-4xl font-bold">
                        <h2>Popular Collections</h2>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap grid grid-cols-3">
                       {marketPlace.map((item, index) => (
                    <div key={index} className="w-full max-w-[20rem] p-6 bg-white rounded-2xl">
                                <div>
                                    <a href={item.music_link}>
                                        <img src={imageLinks[index]} alt="" className="h-40 w-full rounded-3xl object-cover object-center cursor-pointer hover:scale-105 hover:-rotate-3" />
                                    </a>
                                </div>
                                <div className="flex items-center py-4 justify-between [&>*]:mx-2 [&>*>img]:h-20 [&>*>img]:aspect-square [&>*>img]:object-cover [&>*>img]:object-center [&>*>img]:rounded-xl [&>*>img:hover]:scale-110 [&>*>img:hover]:-rotate-12 [&>*>img]:cursor-pointer">
                                </div>

                                <div className="flex items-center justify-between">
                                    <h2>{item.description}</h2>
                                    <div className="flex items-center justify-center gap-1 cursor-pointer">
                                        <div className="text-2xl">
                                            <IconButton
                                                variant={"ghost"}
                                                _hover={{ bgColor: "none" }}
                                                icon={<BsCoin size={"sm"} />}
                                                size="sm"
                                                m={0}
                                                p={0} />
                                        </div>
                                        <p className="text-sm">{item.price}</p>
                                    </div>
                                </div>
                            <BuyNFTButton tokenId={item.token_id} price={item.price}></BuyNFTButton>
                            </div>
                ))}       
                </div>
                </>
        )}
        </>
    );
}
export default MarketPlace;