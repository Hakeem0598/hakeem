const corsConfig = { origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', credentials: true }

export default corsConfig;