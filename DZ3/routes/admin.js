const express = require('express')
const formidable = require('formidable')
const router = express.Router()
const db = require('../db')()
const store = require('../store')
const fs = require('fs')
const path = require('path')

router.get('/', (req, res, next) => {
  res.render('pages/admin', { 
    title: 'Admin page', 
    age: store().skills.age, 
    concerts: store().skills.concerts, 
    cities: store().skills.cities, 
    years: store().skills.years
  })
})

router.post('/skills', (req, res, next) => {
  let form = new formidable.IncomingForm({ multiples: true })
  
  form.parse(req, (err, fields, files) => {
    const skills = [
      {
        "number": fields.age,
        "text": "Возраст начала занятий на скрипке"
      },
      {
        "number": fields.concerts,
        "text": "Концертов отыграл"
      },
      {
        "number": fields.cities,
        "text": "Максимальное число городов в туре"
      },
      {
        "number": fields.years,
        "text": "Лет на сцене в качестве скрипача"
      }
    ]

    db.set('skills', skills)
    db.save()
    res.redirect('/admin/?msg=ok')
  });
})

router.post('/upload', (req, res, next) => {  
  let form = new formidable.IncomingForm()
  let upload = path.join('./public', 'assets', 'img', 'products')

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload)
  }
  
  form.uploadDir = path.join(process.cwd(), upload)

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }

    const valid = validation(fields, files)

    if (valid.err) {
      fs.unlinkSync(files.photo.path)
      return res.redirect(`/?msg=${valid.status}`)
    }
    
    const fileName = path.join(upload, files.photo.name)
    const products = db.stores.file.store.products

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }

      const newProduct = {
        "src": fileName.replace('public/', './'),
        "name": fields.name,
        "price": parseInt(fields.price)
      }

      products.push(newProduct);

      db.set('products', products)
      db.save()
      res.redirect('/admin/?msg=ok')
    })
  })
})

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true }
  }
  return { status: 'Ok', err: false }
}

module.exports = router
