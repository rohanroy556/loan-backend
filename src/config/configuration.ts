export default () => ({
    database: {
        uri: process.env.DB_URI || 'mongodb+srv://cluster556.v1vyu.mongodb.net/loan',
        user: process.env.DB_USER || 'loan',
        pass: process.env.DB_PASS || 'IpVnSWqUeA4Lnse8' 
    }
});