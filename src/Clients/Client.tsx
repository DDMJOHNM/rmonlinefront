import React, { useEffect } from "react";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { Add, ClientSlice } from "../redux/reducers/ClientReducer";
import { useAppDispatch } from "../redux/hooks";
import { getCSRF } from '../redux/reducers/LoginReducer';
import { SnackBar } from '../components/SnackBar';
import Clients from "./Clients";


const mapState = (state: RootState) => ({
  practise: state.practise,
  login: state.login,
});

const mapDispatch = {
  GetClients: () => ({ type: "client/getClients" }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Client {
  id?: number;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  country?: string;
  status?: number;
  email?: string;
  contactNumber?: number;
  age?: number;
}
interface Props extends PropsFromRedux {
  client: Client;
}

const Client = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading: boolean = props.practise.loading;
  const loggedin: boolean | undefined = document.cookie ? true : false;

  const [client, setClient] = React.useState<Client | null>(null);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setClient({ [e.currentTarget.name]: e.currentTarget.value });
  };

  useEffect(() => {
    //dispatch(GetClients())
  }, [dispatch]);

  if (loading) return <SnackBar message={"Loading"} color={"grey"}/>;

  return (
    <div className="grid">
        {props.practise.error &&
            <SnackBar color={"red"} message={"Error adding client"} />
        }

        {props.practise.success &&
            <SnackBar color={"green"} message={props.practise.success} />
        }
        <div className="row">
        <div className="col-1-of-2">             
          <form className="client-form" onSubmit={
              (e:React.SyntheticEvent)=>{
                  e.preventDefault();
                  const target = e.target as typeof e.target &{
                      firstName:{value:string}
                      lastName:{value:string}        
                      street:{value: string}      
                      city:{value: string}  
                      country:{value: string}  
                      status:{value: number}
                      email:{value: string}
                      contactNumber:{value: number}
                      age:{value: number}

              };                         
              dispatch(Add(
                { 
                  firstName:target.firstName.value,
                  lastName:target.lastName.value, 
                  street:target.street.value,
                  city:target.street.value,
                  country:target.country.value,
                  status:target.status.value,
                  email:target.email.value,
                  contactNumber:target.contactNumber.value,
                  age:target.age.value,
                 }
              ));                  
            }
           }>
            <h2>Add Client</h2>
            <div className="client-form__group">
              <label htmlFor="firstName" className="client-form__label">
                FirstName
              </label>
              <input
                type="text"
                name="firstName"
                className="client-form__firstName"
              />
            </div>
            <div className="client-form__group">
              <label htmlFor="lastName" className="client-form__label">
                LastName
              </label>
              <input
                type="text"
                name="lastName"
                className="client-form__lastName"
              />
            </div>
            <div className="client-form__group">
              <label htmlFor="street" className="client-form__label">
                Street
              </label>
              <input
                type="text"
                name="street"
                className="client-form__street"
              />
            </div>
            <div className="client-form__group">
              <label htmlFor="city" className="client-form__label">
                City
              </label>
              <input type="text" name="city" className="client-form__city" />
            </div>
            <div className="client-form__group">
              <label htmlFor="country" className="client-form__label">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="client-form__country"
              />
            </div>
            <div className="client-form__group">
              <label htmlFor="Status" className="client-form__label">
                Status
              </label>
              <input
                type="text"
                name="status"
                className="client-form__status"
              />
            </div>            
            <div className="client-form__group">
              <label htmlFor="email" className="client-form__label">
                Email 
              </label>
              <input
                type="text"
                name="email"
                className="client-form__email"
              />
            </div>
            <div className="client-form__group">
              <label htmlFor="contactNumber" className="client-form__label">
                Contact 
              </label>
              <input
                type="text"
                name="contactNumber"
                className="client-form__contactNumber"
              />
            </div>
            <div className="client-form__group">
              <label htmlFor="Age" className="client-form__label">
                Age
              </label>
              <input
                type="text"
                name="age"
                className="client-form__age"
              />
            </div>
            <input className="client-form__submit" type="submit" value="Save" />
          </form>
        </div>
        <div className="col-2-of-2">
          {/* <h2>Payments</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Appointment</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-02-2022</td>
                <td>J Mascis</td>
                <td>100.00</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Owing:</td>
                <td>$100.00</td>
              </tr>
            </tfoot>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default connector(Client);

//Exposes Helper Type Connected Props
//it can extract types of mapStateToProps and mapDispatchToProps from its first function
//This means that if you split the connect call into two steps, all of the "props from Redux"
//can be inferred automatically without having to write them by hand
