const fs = require('fs');
const process = require('process')
const axios = require('axios')

function  cat(path){
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err){
            console.log(`error: ${path}: ${err}`);
            process.kill(1)
        } else {
            console.log(data)
        }
    })
}

async function webCat(url){
    try{
        let resp = await axios.getAdapter(url)
        console.log(resp.data);
    } catch (err){
        console.error(`error: ${url}: ${err}`)
        process.exit(1)
    }
}

let path = process.argv[2];

if (path.slice(0,4) ==='http'){
    webCat(path);
} else {
    cat(path);
}
