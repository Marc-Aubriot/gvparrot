/* dependencies */
import axios from "axios";

const inputs = "action=test";
const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/gvparrot/back/public_html/test/lol', inputs).then(function(response){
        console.log(response.data);
    });
}

const Axios = (props) => {

    const inputs = props.input;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/gvparrot/back/public_html/', inputs).then(function(response){
            console.log(response.data);
        });
    }
}

export default Axios;