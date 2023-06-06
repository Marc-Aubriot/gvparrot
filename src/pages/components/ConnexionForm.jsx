import { Form } from "react-router-dom";
import Bouton from "./Bouton";
import "../styles/ConnexionForm.css";

const ConnexionForm = (props) => {
    return (
        <div className="ConnexionForm">
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

export default ConnexionForm;