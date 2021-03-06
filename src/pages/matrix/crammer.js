import React from 'react';
import ReactDOM from 'react-dom';
import create_matrice from '../../fumction/crammer_support'
import resetelement from '../../fumction/resetElement'
import showMatrix from '../../fumction/crammer_show'
import cramer_cal from '../../fumction/crammer_cal';
import crammer from '../../pictures/crammer.jpg'
import createButton from '../../fumction/createButton'
import crammer_detail from '../../fumction/crammer_detail'
import axios from 'axios';

let button_exit = false;
let detail_exit = false;

function cramer ()
{
    const detail = () =>
    {
        let pp = parseInt(document.getElementById("n").value)
        resetelement("inner_detail_show")
        crammer_detail(pp,"inner_detail_show")
    }
    const cram = () =>
    {
        let pp = parseInt(document.getElementById("n").value)
        resetelement("ans")
        cramer_cal(pp,"ans");
        if(!detail_exit)
        {
            detail_exit = true;
            createButton("Show Detail", "button is-info", detail, "inner_detail_button");
        }
    }
    const pop = () =>
    {
        let pp = parseInt(document.getElementById("n").value)
        resetelement("show")
        showMatrix(pp,"show")
        if(button_exit != true){
            button_exit = true;
           createButton("Crammer rule", "button is-warning", cram, "crammer");
        }
    }
    const add = () =>
    {
        let pp = parseInt(document.getElementById("n").value)
        resetelement("mat")
        create_matrice(pp,"mat")
        /*Interesting*/
        createButton("submit matrix", "button is-primary", pop, "mat");
        /**/
    }
    async function api_call ()
    {
        try{
            const data = await axios.get("https://my-json-server.typicode.com/ArKa47/api/matrix/cram").then(response => response.data)
            console.log(data)
            let arr = data["Array"];
            //console.log(arr)
            let pp = parseInt(document.getElementById("n").value=data["Array Size"])
            add();
            let str="";
            let equa="";
            for(let i=0; i<pp; i++)
            {
                for(let j=0; j<pp; j++)
                {
                    str = "matrix"+i+j;
                    document.getElementById(str).value=arr[i][j];
                }
                equa="equal"+i
                document.getElementById(equa).value=arr[i][3];
            }
        }catch(err){
            alert(err);
        }
    }
    return(
        <div className="App">
            <br></br>
            <div className="container">
                <h1 className="title is-1" id="test">Crammer Rule</h1>
                <h1 className="subtitle">Matrix</h1>
                <br></br>
                <img src={crammer} alt="crammer"/>
                <div className="cute-mid">
                    <br></br>
                    <p>Formular is : xi = det(Ai)/det(A)</p>
                </div>
                <br></br>
                <div className="my-SubcontainerM">
                    <input className="input is-primary" placeholder="n*n matrix" id="n"></input>
                </div>
                <button className="button is-info" onClick={add} id="iteration">plot matrix</button>
                <span> </span>
                <span className="button is-danger" onClick={api_call} id="api_call">Get example</span>
                <br></br>
                <br></br>
                <div className="cute-mid" id="main">
                    <div id="mat">
                    </div>
                    <br></br>
                    <div id="show">
                    </div>
                    <br></br>
                    <div id="crammer">
                    </div>
                    <br></br>
                    <div id="ans">
                    </div>
                    <br></br>
                    <div id="detail">
                        <div id="inner_detail_button"></div>
                        <br></br>
                        <div id="inner_detail_show"></div>
                    </div>
                </div>
                <br></br>
              <br></br>
            </div>
        </div>
    )
}

export default cramer;