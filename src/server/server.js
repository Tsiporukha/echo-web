const app = require('./app').default;

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
