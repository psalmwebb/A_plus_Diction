// import React from "react"
import {useState,useEffect,useRef} from "react"
import "./styles/App.css"

import data from "../test.json"


console.log(data)

export default function App(){

    const [word,setWord] = useState<string>("")
    const [allResult,setAllResult] = useState<Array<any>>([])
    const userInputRef = useRef<any>()

    useEffect(()=>{
        
        if(!word) return;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en-US/${word}`)

        .then((res:Response)=> res.json())
        .then(data=>{
            setAllResult(data)
            console.log(data)
        });
    },[word])

    const handleClick=(e:MouseEvent) : void =>{
        console.log(userInputRef.current.value)
        setWord(userInputRef.current.value);
    }

    const handleWordClick=(e : any) : void =>{
        setWord(e.target.textContent)
        userInputRef.current.value = e.target.textContent
    }

    return (
        <div className="App">
            <h2>A+ Diction</h2>
          <div className="search-box">
              <input type="search" ref={userInputRef} placeholder="Search word here..."/>
              <button onClick={handleClick}>SEARCH</button>
          </div>

          <div className="content">
            {
                 allResult.length ? allResult.map((result:any,i:Number)=>(
                    <div key={Math.random() * 10E10}>
                           {
                               result.meanings.map(meaning=>(
                                   <div key={Math.random()} className="section">
                                      <div>
                                        <span>
                                            <b><big>{result.word.toUpperCase()}</big></b>  :  <i>{meaning.partOfSpeech}</i> 
                                        </span>
                                      </div>
                                      <br/>

                                      <div>
                                          {
                                              meaning.definitions.map(d=>(
                                                  <div key={Math.random()}>
                                                    <div><b>Def : </b></div>
                                                    <li>{d.definition}</li>
                                                      
                                                    { d.synonyms?.length ?
                                                        <div>
                                                            <h4>Synonyms</h4>
                                                            <br/>
                                                            <p id="synonymsDiv">{d.synonyms?.map(word=>
                                                                                <span key={Math.random()} id="synonyms" onClick={handleWordClick}>{word}</span>)}</p>
                                                        </div>
                                                        : null
                                                    }

                                                    {d.example && <div>
                                                        <h3>e.g : </h3>
                                                        <p>{d.example}</p>
                                                    </div>
                                                     }
                                                    <br/>
                                                  </div>
                                              ))
                                          }
                                      </div>
                                   </div>
                               ))
                           }
                    </div>
                ))
                :
                
                  <h1><center>No Result found...</center></h1>
            }
          </div>
        </div>
    )
}
