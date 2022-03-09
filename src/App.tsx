import "./index.css"
import React, {useEffect, useState} from "react";
import Chart from "react-google-charts";
import {collection, doc, getDocs, getFirestore} from "firebase/firestore";
import {data1,data2,allCountries} from "./dataExmples";
import {db} from "./firebaseCongig";

const dataStats={"first":data1,"second":data2}

export default function App(){


    const [dataset,setDataset]=useState(data1)
    const [regions,setRegions]=useState("world")
    const [document,setDoc]=useState([["Country", 'Popularity'], ["United States", 1]])
    const [red,setRed]=useState("255")
    const [green,setGreen]=useState("0")
    const [blue,setBlue]=useState("0")




    const options = {
        region:regions,
        sizeAxis: { minValue: 100, maxValue: 100 },

        colorAxis: {colors: 'rgb('+red+','+green+','+blue+')'},
        legend:{textStyle: {color: 'black', fontSize: 10}},
        tooltip:{textStyle: {fontSize: 30,bold:true}, showColorCode: true},

        backgroundColor: '#81d4fa',
        datalessRegionColor: 'white',
        defaultColor: '#f5f5f5',
        magnifyingGlass: {enable: true, zoomFactor: 7.5}

    };
    const tableOption={
        cssClassNames :{headerRow: 'bigAndBoldClass',
            hoverTableRow: 'highlightClass'}
    };
    const pieChartOption={
        chartArea:{left:"0%",right:"0%",top:20,width:'60%',height:'80%'},
        fontSize:12,
        tooltip:{textStyle: {fontSize: 15,bold:true}, showColorCode: true},

        legend:{position: 'bottom', maxLines:2,textStyle: {color: 'blue', fontSize: 11}}
    }




    const dataChange =(e:React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value=="first") {setDataset(data1)}
        else if(e.target.value=="second"){setDataset(data2)}
        else if(e.target.value=="allCountries"){setDataset(allCountries)}
        else if(e.target.value=="database"){
            const snapshot = getDocs(collection(db, "test-db"))
            snapshot.then((querySnapshot) => {
                querySnapshot.docs
                    .forEach((doc) => {
                        console.log(typeof(doc.data()))
                        if(typeof(doc.data())=="object"){
                            console.log(doc.data())
                            setDoc(Object.entries(doc.data()))

                        }
                    });
            });
            setDataset(document)
        }


    }

    const mapZoom=(e:any)=>{

    }

    return (
        <div className="App">
            <select name="change_table"  onChange={(e)=>dataChange(e)} className="changeTable">
                <option value="first" >first</option>
                <option value="second" >second</option>
                <option value="database" >from firestore</option>
                <option value="allCountries" >All Countries</option>
            </select>
            <Chart chartType="GeoChart" width="100%" height="420px" data={dataset} options={options}  />
            <div className="regionButtonParent">

                <button className="regionButton" onClick={()=>setRegions("world")}>World</button>
                <button className="regionButton" onClick={()=>setRegions("002")}>Africa</button>
                <button className="regionButton" onClick={()=>setRegions("150")}>Europe</button>
                <button className="regionButton" onClick={()=>setRegions("021")}>North America</button>
                <button className="regionButton" onClick={()=>setRegions("005")}>South America</button>
                <button className="regionButton" onClick={()=>setRegions("142")}>Asia</button>
                <button className="regionButton" onClick={()=>setRegions("009")}>Oceania</button>


            </div>
            <div className="chartParent">
                <Chart className="tableCLass" chartType="Table"  data={dataset} width="100%" height="200px" options={tableOption}/>

                <Chart className="pieChartClass" chartType="PieChart" data={dataset} width="100%" height="200px" options={pieChartOption}/>
            </div>
            <input type="range" className="input-range-red" name="foo" min="0" max="255" onChange={(e)=>setRed(e.target.value)} />
            <input type="range" className="input-range-green" name="foo" min="0" max="255" onChange={(e)=>setGreen(e.target.value)} />
            <input type="range" className="input-range-blue" name="foo" min="0" max="255" onChange={(e)=>setBlue(e.target.value)} />


        </div>
    );

}



