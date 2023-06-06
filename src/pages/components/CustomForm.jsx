import { Form } from "react-router-dom";
import Bouton from "./Bouton";
import "../styles/CustomForm.css";

const CustomForm = (props) => {
    return (
        <div className="customForm">
            <Form method="post" action={props.action}>

                <div className="field">
                    <label>Email</label>
                    <br />
                    <input type="email" id="mail" name="mail"></input>
                </div>
                
                <div className="field">
                    <label>Password</label>
                    <br />
                    <input type="password" id="pass" name="pass"></input>
                </div>

                <div className="fieldBtn">
                    <Bouton text="Connexion" type="submit"></Bouton>
                </div>
                
            </Form>
        </div>
    )
}

export default CustomForm;