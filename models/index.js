const mongoose = require('mongoose');

const connect = () => {
    mongoose
        .connect('mongodb+srv://sparta:sparta@cluster0.ool0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = connect;