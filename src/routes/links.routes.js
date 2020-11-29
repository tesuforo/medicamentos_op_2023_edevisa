const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderAddLink, addLink, renderLinks, deleteLink, editLink, renderEditLink,editLink_egreso,renderEditLink_egreso,renderLinks_admin,renderLinks_ocupadas,renderLinks_sedes_disponible, renderLinks_observacion, renderLinks_hospitalario} = require('../controllers/links.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/add', renderAddLink);
router.post('/add', addLink);
router.get('/', isLoggedIn, renderLinks);
router.get('/list_todas', isLoggedIn, renderLinks_admin);
router.get('/list_observacion', isLoggedIn, renderLinks_observacion);
router.get('/list_hospitalario', isLoggedIn, renderLinks_hospitalario);
router.get('/list_ocupadas', isLoggedIn, renderLinks_ocupadas);
router.get('/list_sedes_disponible', isLoggedIn, renderLinks_sedes_disponible);
router.get('/delete/:id', deleteLink);
router.get('/edit/:id', renderEditLink);
router.post('/edit/:id', editLink);
router.get('/edit_egreso/:id', renderEditLink_egreso);
router.post('/edit_egreso/:id', editLink_egreso);


module.exports = router;