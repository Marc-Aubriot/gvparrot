/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/VerifyComments.css';

const VerifyComments = () => {

    const [formSend, setFormSend] = useState(false);
    const [response, setResponse] = useState();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect( ()=> {
        const getComments = () => {

            const inputs = `action=getComments&q=all`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });
                data.pop();
                setComments(data);
                setIsLoading(false);
            });
        }

        getComments();
        if (reload) { setReload(false); };

    }, [reload]);

    const deleteComment = (e) => {
        const input = `action=deleteComment&ID=${e.target.id}`;
        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, input).then(function(response) {

            const rawdata = response.data;
            setResponse(rawdata);
            setReload(true);
            setFormSend(true);
        });
    }

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const verifyComment = (e) => {
        const commentCard = document.getElementById(`card-${e.target.id}`);
        const id = e.target.getAttribute('data-comment-id');
        const q = e.target.getAttribute('data-comment-q');

        console.log(`target id: ${e.target.id},  id: ${id},   q:${q}`);

        if (q === '0') {

            commentCard.className = 'verifyCommentsCommentCard pin';
            e.target.setAttribute('data-comment-q', '1');
            e.target.textContent = "Enlever de l'Accueil";

        } else if (q === '1') {

            commentCard.className = 'verifyCommentsCommentCard';
            e.target.setAttribute('data-comment-q', '0');
            e.target.textContent = "Ajout à l'Accueil";
        };


        const input = `action=verifyComment&ID=${id}&q=${q}`;
        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, input).then(function(response) {
            const rawdata = response.data;
            setResponse(rawdata);
            setReload(true);
            setFormSend(true);
        });
    }

    return (
        <div className='verifyCommentsWrapper'>
            <h2 className='verifyCommentsTitle'>Cliquer sur un commentaire pour le valider ou sur le bouton supprimer pour l'effacer </h2>
            <h3 className='verifyCommentsSubTitle'>(Les commentaires encadrés sont affichés à l'Accueil)</h3>

            {
                formSend ?
                <p className='verifyCommentsResponseText'>{response}</p>
                :
                ""
            }

            {
                isLoading ?
                <Spinner />
                :
                <div className='verifyCoommentsCardsWrapper'>
                    {
                        comments.map( (e,i) => {

                            return (
                                <div className={ (e[4] === "1") ? 'verifyCommentsCommentCard pin' : 'verifyCommentsCommentCard'} id={`card-${i}`}> 

                                    <div className='verifyCommentsCommentCardTopRow'>
                                        <p>{e[1]}</p>
                                        <p>{e[3]}</p>
                                    </div>
                                    
                                    <p className='verifyCommentsCommentCardComment'>"{e[2]}"</p>

                                    <div className='verifyCommentsCommentCardBotRow'>
                                        <button id={e[0]} onClick={deleteComment} className='verifyCommentsCommentCardDeleteBtn'>Supprimer</button>
                                        <button data-comment-id={e[0]} data-comment-q={e[4]} id={`${[i]}`} onClick={verifyComment} className='verifyCommentsCommentCardDeleteBtn'>{e[4] === '0' ? "Ajout à l'Accueil" : "Enlever de l'Accueil"}</button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default VerifyComments;