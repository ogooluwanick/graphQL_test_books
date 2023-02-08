import React, { useRef } from 'react'
import {BsSearch} from "react-icons/bs"
import {RxReset} from "react-icons/rx"
import "./styles.css"


const InputField = ({ search,setSearch,handleBookSelection, data, setData}) => {

        const inputRef=useRef(null);
        
        const booksQuery = ` books {  id name author { name } } `
        const authorsQuery = ` authors {  id name  } `
        const query = ` query {  books: ${booksQuery}   authors: ${authorsQuery}  }`
        const url = `http://localhost:3001/graphql`;
        const handleReset=()=>{
                fetch(url, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ query: query })
                })
                .then(response => {
                        if (!response.ok) {
                                throw new Error(response.statusText);
                        }
                        return response.json();
                })
                .then(data => {
                        setData({books:[...data.data.books], authors:[...data.data.authors]});
                })
                .catch(error => { 
                        console.error(error);
                });
              
        }

        return (
        <form className='input' onSubmit={(e)=>{handleBookSelection(e); inputRef.current?.blur();}}>
                <input type="input" 
                                ref={inputRef}
                                placeholder='Search our library...' 
                                className='input__box' 
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}

                />
                        <button className='input_submit reset' type="reset" onClick={()=>handleReset()}><RxReset color='white' /></button>
                        <button className='input_submit' type='submit'><BsSearch /></button>
                </form>
        )
}

export default InputField