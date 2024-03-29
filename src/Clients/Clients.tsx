import React,{useEffect} from 'react';
import {connect,ConnectedProps, useSelector} from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import {GetClients} from '../redux/reducers/ClientReducer';
import { useAppDispatch } from '../redux/hooks';
import {SnackBar} from "../components/SnackBar";

const mapState = (state: RootState) => ({
  practise: state.practise,
  login: state.login,
})
  
const mapDispatch = {
  GetClients: () => ({ type: 'client/getClients' }),
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

interface  Client {
  id: number
  firstName: string    
  lastName: string
  street: string
  city: string
  country:string
  status:number

}
interface Props extends PropsFromRedux {
  clients : Array<Client>  
}

const Clients  = (props:Props)=>{

  const dispatch = useAppDispatch();
  const loading : boolean = props.practise.loading;
  const loggedin : boolean | undefined = document.cookie? true: false;
 
  useEffect(()=>{
    dispatch(GetClients())
  },[dispatch])

  if( loading ) return <SnackBar message={"Loading"} color={"grey"}/>;

   
  return <div className="App">
     
    <table className="client-list">
      <thead>
      <tr>
        <th className="client-list__th">Name</th>      
        <th className="client-list__th">Address</th>
        <th className="client-list__th">City</th>
        <th className="client-list__th">Country</th>
        <th className="client-list__th">Status</th>
      </tr>
     </thead>
     <tbody>
      {props.practise.clients.map((c,i)=>{
         return (
           
              <tr key={i}>
                <td><Link to={'/clients/client/'+ c.id}>{c.firstName} {c.lastName}</Link></td>               
                <td>{c.street}</td>
                <td>{c.city}</td>
                <td>{c.country}</td>
                <td>{c.status}</td>              
              </tr>
           
          );
        })}
     </tbody>
    </table>  
  </div>;
}
 

export default connector(Clients);

//Exposes Helper Type Connected Props
//it can extract types of mapStateToProps and mapDispatchToProps from its first function
//This means that if you split the connect call into two steps, all of the "props from Redux" 
//can be inferred automatically without having to write them by hand



