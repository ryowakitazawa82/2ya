import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();
const app: express.Express = express();

// NOTE: Setting rendering engine
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './src/pug/pages');


//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


app.listen(3000, () => {
  console.log('Start on port 3000.');
});

//NOTE: Routing
app.get('/', (req: express.Request, res: express.Response) => {

  // TODO:!important after change api fetch process
  const newsAPI = process.env.MICROCMS_API_SVC_DOMAIN + 'news';

  // @ts-ignore
  axios.get(newsAPI, {
    headers: {
      'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY,
    },
  }).then((data) => {
    const news = data.data.contents;
    res.render('index', { news: news });
  });
});

app.get('/company', (req: express.Request, res: express.Response) => {
  res.render('company');
});

app.get('/contact', (req: express.Request, res: express.Response) => {
  res.render('contact');
});
