import React, { useRef } from 'react'
import {BsSearch} from "react-icons/bs"
import "./styles.css"


const InputField = ({ search,setSearch,handleBookSelection,}) => {

        const inputRef=useRef(null);

        return (
        <form className='input' onSubmit={(e)=>{handleBookSelection(e); inputRef.current?.blur();}}>
                <input type="input" 
                                ref={inputRef}
                                placeholder='Search our library...' 
                                className='input__box' 
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}

                />
                <button className='input_submit' type='submit'><BsSearch /></button>
        </form>
        )
}

export default InputField