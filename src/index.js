import express from 'express'; 
import morgan from 'morgan';
import { PORT } from './config.js';
import iaHandlingRoutes from './routes/iaHandling.routes.js'

const app = express();

// Midlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', iaHandlingRoutes);

// Default
app.use((req ,res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
})

app.listen(PORT);
console.log(`Server runing on port ${PORT}`);