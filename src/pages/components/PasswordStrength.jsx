/* styles */
import './styles/PasswordStrength.css';

// affiche une barre de progression de la force du password
const PasswordStrength = (props) => {

    const strengthChecker = () => {      
      	let strengthValue = 0;
      	let regexList = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
      	let strengthText = ["", "Inexistant", "Faible", "Moyen", "Bon", "Fort"];
	
      	regexList.forEach((regex) => {
        	if (new RegExp(regex).test(props.password)) {
          		strengthValue += 1;
        	}
      	});
      	if(props.password.length >=8){
        	strengthValue += 1;
      	}
      	return { text: strengthText[strengthValue], value: strengthValue }
    };

    return <div > 
        <progress
            className={`pwd-checker-bar strength-${strengthChecker().text}`}
            value={strengthChecker().value}
            max="5"
          /> {strengthChecker().text}
      </div>;
}

export default PasswordStrength;