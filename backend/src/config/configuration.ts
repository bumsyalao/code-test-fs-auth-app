export default () => ({
  port: parseInt(process.env.PORT || '3001', 10) || 3001,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-here',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});
