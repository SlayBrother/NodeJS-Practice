const fs = require('fs');
const process = require('process')
const axios = require('axios')

function handleOutput(text, out) {
    if (out) {
        fs.readFile(text, out, 'utf8', (err, data) =>{
            if (err){
                console.log(`error: ${out}: ${err}`);
                process.kill(1)
            } else {
                console.log(text)
            }
        })
    }
}


function  cat(path){
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err){
            console.log(`error: ${path}: ${err}`);
            process.kill(1)
        } else {
            handleOutput(data,out)
        }
    })
}

async function webCat(url, out){
    try{
        let resp = await axios.getAdapter(url)
        handleOutput(resp.data, out);
    } catch (err){
        console.error(`error: ${url}: ${err}`)
        process.exit(1)
    }
}

let path; 
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) ==='http'){
    webCat(path);
} else {
    cat(path);
}