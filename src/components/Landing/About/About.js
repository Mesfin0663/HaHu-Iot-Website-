import React,{useState, useEffect} from 'react'
import Navigation from '../../Navigation'
import './About.css'
import BookView from './BookView'
import Gauge from './Gauge'
import Graph from './Graph'
import IotButton from './IotButton'
import Records from './data.json'
import GaugeScreen from './GaugeScreen'
import Modal from './Modal'
import ChartNew from './ChartNew'
import data from './data.json'
import moment from 'moment';

function About() {
    let timestamps = [];
    let values = [];
    let values1 = [];
    const [mytemp, setTemp]= useState({});
    const [mytime, setTime]= useState({});
    const Temperature = Records.users.GMeI9bKKKsMcp1mrbdL2UBuuCy43.Devices.Device_1.Storage.Sensor_1;
    const Humidity = Records.users.GMeI9bKKKsMcp1mrbdL2UBuuCy43.Devices.Device_1.Storage.Sensor_2;

    console.log("Records..........");

    Object.keys(Temperature).forEach(key =>{

        timestamps.push( 
            
            new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Temperature[key].Ts)
        );
        values.push(Temperature[key].Value);
    })
    // Object.keys(Humidity).forEach(key =>{

    //     values1.push(Humidity[key].Value);
    // })

    // const getDatafromLS=()=>{
    //     const data = localStorage.getItem('books');
    //     if(data){
    //         return JSON.parse(data);
    //     }else{
    //         return []
    //     }
    // }
    const [books, setBooks] = useState([]);
    
    const [title, setTitle]= useState([]);
    const [author, setAuthor] = useState([]);
    const [isbn, setIsbn] = useState([]);

    const handleAddBookSubmit =(e) =>{
        e.preventDefault();
        let book ={
            title: title,
            author: author,
            isbn: isbn,
        }
        setBooks([...books, book]);
        setTitle('');
        setAuthor('');
        setIsbn('');
    }
    // delete bok from LS
    const deleteBook =(isbn)=>{
        const filteredBooks = books.filter((element, index)=>{
            return element.isbn !== isbn
        })
        setBooks(filteredBooks);
    }
    //saving data to local storage
    useEffect(()=>{
        localStorage.setItem('books', JSON.stringify(books));
      
    },[books])

    let time = ['sep', 'nov', 'jan', 'me']
    let value = [1,2,3,4]
    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);

    function button1Click(){
      setButton1(!button1);
    }
    function button2Click(){
        setButton2(!button2);

    }
    function button3Click(){
        setButton3(!button3);

    }
  return (

    <div>
          <div className="gradient__bg">
      <Navigation />
      </div>
      {/* <div className="container size"></div> */}

      

   
   
       

        <section>
          <div className="container">
                <div className="row">
                    <div className="col">
                    <h1>Book List</h1>
                <p>Add and view yor books using local storage</p>
                <div className="row p-5">
                    <div className="col-sm-12 col-md-6 form-container ">
                        <form autoComplete='off' className="form-group " onSubmit={handleAddBookSubmit}>
                            <label >Title</label>
                            <input type="text" className="form-control" required 
                             onChange={(e)=> setTitle(e.target.value)} value = {title}
                            />
                           <br />
                           <label >Author</label>
                            <input type="text" className="form-control" required
                             onChange={(e)=> setAuthor(e.target.value)} value = {author}
                            />
                           <br />
                           <label >ISBN#</label>
                            <input type="text" className="form-control" required
                              onChange={(e)=> setIsbn(e.target.value)} value = {isbn}                           
                            />
                           <button type= "submit" className="btn btn-success btn-md">
                              ADD
                           </button>
                        </form>
                    </div>
                    <div className="col-sm-12 col-md-6 view-container  ">
                        <div className="m-2 ">
                        {books.length > 0 && <div className="bg-success table-responsive">
                      <table className="table ">
                      <thead>
                              <tr>
                                  <th>ISBN#</th>
                                  <th>Title</th>
                                  <th>Author</th>
                                  <th>Delete</th>
                              </tr>
                          </thead>
                          <tbody>
                            <BookView books={books} deleteBook={deleteBook}/>
                          </tbody>
                      </table>
                      </div> }
                      {books.length < 1 && <div className="bg-success ">No books are added</div> }
                        </div>
                    
                    </div>
                </div>
                    </div>
                </div>
          
          </div>
        </section>
    <section>
        <div className="container bg-success">
        <div className="row ">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6"> 
              <div className="contact_info">
                <h1 className="title">
                    Contact Ditail
                </h1>
                <p>You need to be sure there isn't anything embarrassing hidden in the repeat predefined chunks as nessing hidden in the repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                <div className="contact_information">
                    <ul className="unemberd_list">
                        <li className="list_item">
                            <h1 className="info_title">
                                Address
                            </h1>
                            <ul className="unemberd_list">
                            <li className="list_item">
                                Adis Ababa 
                            </li>
                            <li className="list_item">
                               Bole
                            </li>
                        </ul>
                        </li>
                        <li className="list_item">
                            <h1 className="info_title">
                                Phone number
                            </h1>
                            <ul className="unemberd_list">
                            <li className="list_item">
                                +25194565855
                            </li>
                            <li className="list_item">
                            +25194565855
                            </li>
                        </ul>
                        </li>
                    </ul>
                </div>
              </div>
            </div> 
            <div className="col-12 col-sm-12 col-md-12 col-lg-6"> 
               <div className="contact_form_">
               <h1 className="title">Get In Touch</h1>
                <div className="leav_comment">
                    <div className="contact_form">
                        <form action="">
                            <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 form-group">
                                       <input type="text" className="form-control" id="name" placeholder="Your Name"/>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 form-group">
                                        <input type="email" className="form-control" id="email" placeholder="Your E-mail"/>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 form-group">
                                        <input type="text" className="form-control" id="subject" placeholder="Pick Your Subject"/>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 form-group">
                                        <textarea className="form-control" id="comment" placeholder="Your Comment Wite Here ..."></textarea>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 submit-btn">
                                        <button type="submit" className="text-center">Send Massage</button>
                                    </div>
                            </div>

                        </form>
                    </div>
                </div>
               </div>
            </div> 
        </div>
        </div>
    </section>
    </div>
  )
}

export default About