import  React,{useState, useEffect} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import "./UserList.css";
import { ContactsOutlined, DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummyData";
import { database } from "../../Firebase/firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { Switch, Route, useRouteMatch  } from 'react-router-dom';
import IotGraphScreen from '../../Iot/IotGraph/IotGraphScreen'
import UserData from '../UserData/UserData';
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 98 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function ListUsers(props) {
    const [users, setUsers]= useState({});
    const [data, setData] = useState(userRows);
    const [loading, setLoading] = useState(true);
    const [myUsers, setMyUsers] = useState({});
    let { path, url } = useRouteMatch();
    console.log(path);
    useEffect(() => {

        database.ref().child('users').on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                const usersObject = snapshot.val();
                var a= 0;
                const usersList = Object.keys(usersObject).map(key => (
                  
                  {
                  id: a++,
                  uid: key,
                  name: usersObject[key].name,
                  email: usersObject[key].email

                }
                
                ));
                setUsers(usersList);
                setLoading(false);

            } else {

            }
        })
    }, []);

    const handleDelete = (uid) => {
          console.log(uid);
    };
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "name",
          headerName: "Username",
          width: 200,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/adminpage/users/" + params.row.uid}>
                  <button className="userListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(params.row.uid)}
                />

                
              </>
            );
          },
        },
      { field: "email", headerName: "Email", width: 200 },
        { field: "uid", headerName: "USER REAL ID", width: 300 },

        // {
        //   field: "Porfile",
        //   headerName: "Profile",
        //   width: 100,
        //   renderCell: (params) => {
        //     return (
        //       <div className="userListUser">
        //         <img className="userListImg" src={params.row.avatar} alt="" />
        //       </div>
        //     );
        //   },
        // },

        // {
        //   field: "status",
        //   headerName: "Status",
        //   width: 120,
        // },
        // {
        //   field: "transaction",
        //   headerName: "Transaction Volume",
        //   width: 160,
        // },
    
    ];
    
  return (
    <>
       {
           loading ? <div className="centering" style={{ height: 600, width: '100%' }} >      
           
           <CircularProgress color="inherit" />

           </div>:
           <div style={{ height: 600, width: '100%' }}>
           <DataGrid
             rows={users}
             columns={columns}
             pageSize={10}
             rowsPerPageOptions={[10]}
             checkboxSelection
             disableSelectionOnClick
           />
         </div>
         }
         
    </>
      
  );
}
export default ListUsers