//import * as fs from 'fs'
import mongoose from 'mongoose'

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

export const logEvent = (fileName, event) => {
    // Append an event (str) to a csv file
    let Explanations;

    if(mongoose.models[fileName]) {
        Explanations = mongoose.model(fileName);
    } else {
        Explanations = mongoose.model(fileName, { name: String });
    }

    const currentDate = new Date();
    const exp = new Explanations({ name: event + '' + JSON.stringify(currentDate) + '\r\n'});
    exp.save().then(() => console.log('explanation saved'));
    /*const currentDate = new Date();
    fs.appendFile(
        `../client/${fileName}.csv`,
        event  + ' ' + JSON.stringify(currentDate) + '\r\n',
        function(err) { if (err) throw err }
    )*/
}
