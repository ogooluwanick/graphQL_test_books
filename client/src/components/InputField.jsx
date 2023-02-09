import React, { useRef } from 'react'
import {BsSearch} from "react-icons/bs"
import {RxReset} from "react-icons/rx"
import "./styles.css"


const InputField = ({ search,setSearch,handleBookSelection, data, setData , refreshData}) => {

        const inputRef=useRef(null);
        
        const booksQuery = ` books {  id name author { name } } `
        const authorsQuery = ` authors {  id name  } `
        const query = ` query {  books: ${booksQuery}   authors: ${authorsQuery}  }`
        const url = `http://localhost:3001/graphql`;
        

        return (
        <form className='input' onSubmit={(e)=>{handleBookSelection(e); inputRef.current?.blur();}}>
                <input type="input" 
                                ref={inputRef}
                                placeholder='Search our library...' 
                                className='input__box' 
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}

                />
                        <button className='input_submit reset' type="reset" onClick={()=>refreshData()}><RxReset color='white' /></button>
                        <button className='input_submit' type='submit'><BsSearch /></button>
                </form>
        )
}

export default InputField