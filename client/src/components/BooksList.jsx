import React from 'react'
import BookItem from './BookItem'


const BooksList= ({data,setData}) => {
        console.log("booklist",data.books)
  return (
        <div className='myBooks'>
                <h2 className='myBooks__heading'>Books</h2>
                {
                        data.books?.map(book=>(
                                <BookItem book={book} key={book.id} data={data} setData={setData}/>
                        ))
                }
        </div>
  )
}

export default BooksList