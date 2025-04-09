import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('person', { person: { name: 'nimi nimi'} });
});

export default router;
