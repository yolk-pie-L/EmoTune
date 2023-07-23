import axios from "axios";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from 'antd';
export function GenerateMusicPage({authentic}){
    const [inputMood, setInputMood] = useState('');
    const [combinedData, setCombinedData] = useState([]);
    const columns = [
      {
        title: 'Your input',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Create Time',
        dataIndex: 'time',
        key: 'time',
      }];
    useEffect(() => {
      axios.get(
        "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/getUserMoods",
        {
            headers: {'Authorization': authentic}
        }
    ).then(function (res) {
        console.log(res.data);
        const descriptions = res.data
          .filter(item => item.music_link == null)
          .map(item => item.description);
        const time = res.data
          .filter(item => item.music_link == null)
          .map(item => item.gen_date);
        const combinedData = time.map((item, index) => ({
            key: index,
            name: descriptions[index],
            time: item
        }));
        console.log(combinedData);
        setCombinedData(combinedData);
        
    })
    },[]);
    const generateMusic = () => {
        event.preventDefault();
        if (inputMood.trim() != '') {
          const curDate = new Date();
          const newData = {
            key: combinedData.length + 1,
            name: inputMood,
            time: curDate
          }
          setCombinedData([...combinedData, newData])
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
        }).catch((error) => {
          console.log(error);
          if(error.message == "Request failed with status code 401"){
            window.alert("You need to login.");
            window.location.href = "/setting";
          }
        })
          setInputMood('');
        }
      }
    const selectTag = (tag) =>{
        event.preventDefault();
        setInputMood(inputMood + tag+ ";");
      }
    return (
        <>
        <div>
            <div className="text-4xl font-bold">
                <h2>Input or Choose Your Mood</h2>
            </div>
        </div>
        <div class="md:row-start-1 tags w-full max-w-2xl h-fit place-self-end">
        <ul class="flex gap-3 flex-wrap [&>*]:bg-white [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-full [&>*:hover]:bg-slate-900 [&>*:hover]:text-white [&>*>a]:flex [&>*>a]:items-center [&>*>a]:gap-2">
         <li><a href="" onClick={() => selectTag("happy")}>
             <h2>happy</h2>
             <iconify-icon icon="system-uicons:cross"></iconify-icon>
             </a></li>
         <li><a href="" onClick={() => selectTag("sad")}>
              <h2>sad</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
              </a></li>
          <li><a href="" onClick={() => selectTag("crazy")}>
              <h2>crazy</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>    
             </a></li>
           <li><a href="" onClick={() => selectTag("hiphop")}>
               <h2>hiphop</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
              </a></li>
            <li><a href="" onClick={() => selectTag("cheerful")}>
               <h2>cheerful</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("delighted")}>
               <h2>delighted</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("relaxed")}>
               <h2>relaxed</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("sorrow")}>
               <h2>sorrow</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("encouraged")}>
               <h2>encouraged</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("confident")}>
               <h2>confident</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("nervous")}>
               <h2>nervous</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("Worried")}>
               <h2>Worried</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("optimistic")}>
               <h2>optimistic</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("peaceful")}>
               <h2>peaceful</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            <li><a href="" onClick={() => selectTag("amazed")}>
               <h2>amazed</h2>
              <iconify-icon icon="system-uicons:cross"></iconify-icon>
            </a></li>
            </ul>
        </div>
                      <div className="w-full max-w-3xl">
                          <div>
                              <form className="relative flex ">
                                  <input type="text" id="search" placeholder="Enter your words here" className="border-0 focus:ring-0 focus:outline-0 w-[60%] bg-slate-600 rounded-l-lg pl-4 text-sm text-slate-200"
                                    value={inputMood}
                                    onChange={e => {
                                      console.log(e.target.value);
                                      setInputMood(e.target.value);
                                    }}/>
                                  <button className="ring-4 ring-slate-600 ring-offset-[0.55rem] shadow-transparent ring-offset-slate-800 hover:ring-offset-rose-500  hover:bg-rose-500 bg-transparent rounded-[50%] active:scale-95 cursor-pointer" onClick={generateMusic}>
                                      <h2 className="rounded-full border-4 border-rose-500 w-16 h-16  text-rose-500 text-2xl text-center justify-center flex items-center font-semibold hover:border-slate-600 hover:text-slate-600">GO</h2>
                                  </button>

                                  <div className="absolute -bottom-8 left-[1%] text-sm flex border-0 focus:outline-0 focus:ring-0 text-rose-500 mt-1 cursor-pointer">
                                      <h2>Tips: Please divide your input with semicolon</h2>
                                      <div className="text-lg">
                                          <iconify-icon icon="material-symbols:keyboard-arrow-down-rounded"></iconify-icon>
                                      </div>   
                                  </div>
                              </form>   
                          </div>
                      </div>
                      <div id="task_title">
                        <h2>Tasks in progress</h2>
                      </div>
                      <Table columns={columns} dataSource={combinedData}></Table>
                      {/* <table className="mt-4 min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks in progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">{task}</td>
                              <td className="px-6 py-3 whitespace-nowrap">{times[index]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
        </>
    );
}

export default GenerateMusicPage;