import React from 'react'
import BookItem from './BookItem'


const BooksList= ({myBooks,setTodos}) => {
  return (
        <div className='myBooks'>
        {
                myBooks.map(book=>(
                        <BookItem book={book} key={book.id} myBooks={myBooks} setMyBooks={setTodos}/>
                ))
        }
        </div>
  )
}

export default BooksList