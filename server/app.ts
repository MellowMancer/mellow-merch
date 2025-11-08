import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import productsRouter from './routes/products';
import cartRouter from './routes/cart';
import checkoutRouter from './routes/checkout';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const apiRouter = express.Router();

apiRouter.use('/', indexRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/checkout', checkoutRouter);

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use('/api', apiRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    message: res.locals.message,
    error: res.locals.error,
  });
});

export default app;
