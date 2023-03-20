
import express from 'express';
import Datastore from'nedb';
import fs from 'fs';

const database = new Datastore('linksDatabase.db');
database.loadDatabase();


const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));


const porta = process.env.PORT || 8080 

app.listen(porta, () =>{
    console.log('Server runing on port: '+porta)
})

app.post("/create-link", (request, response) => {
    const url = request.body.url

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const randomId = makeid(7)

    database.insert({origin: url, short: `https://rona.io/${randomId}`, itemId: randomId})

    response.json({success: true, msg: 'Successfully created!', link: `https://rona.io/${randomId}`})
});

app.get("/:idLink", (request, response) => {
    const idLink = request.params.idLink


    database.find({itemId: idLink}, (err, data) => {
        if (data.length == 1) {
            response.redirect(data[0].origin)
        } else {
            fs.readFile('./public/404.html', function (err, html) {
                if (err) {
                    throw err; 
                } 
                    response.writeHeader(404, {"Content-Type": "text/html"});  
                    response.write(html);  
                    response.end();  
                
            });   
        
        };
    
    })
});


