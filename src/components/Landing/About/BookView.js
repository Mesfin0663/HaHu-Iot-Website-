import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import './bookview.css'
function BookView({books,deleteBook}) {
  return (
    books.map(book=>(
        <tr key={book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td className="delete-btn" onClick={()=> deleteBook(book.isbn)}>
            <DeleteIcon/>
            </td>
        </tr>
    ))
  )
}

export default BookView