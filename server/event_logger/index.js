// Comment the following if you have an online database
import * as fs from 'fs'

export const logEvent = (fileName, event) => {
    let Explanations;
    const currentDate = new Date();
    fs.appendFile(
        `../client/${fileName}.csv`,
        event  + ' ' + JSON.stringify(currentDate) + '\r\n',
        function(err) { if (err) throw err }
    )
}


// Remove comment if you have an online database
/*import mongoose from 'mongoose'

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

export const logEvent = (fileName, event) => {
    let Explanations;
    if(mongoose.models[fileName]) {
        Explanations = mongoose.model(fileName);
    } else {
        Explanations = mongoose.model(fileName, { name: String });
    }
    const currentDate = new Date();
    const exp = new Explanations({ name: event + '' + JSON.stringify(currentDate) + '\r\n'});
    exp.save().then(() => console.log('explanation saved'));
}*/
