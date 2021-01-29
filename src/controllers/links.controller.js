const linksCtrl = {};

const pool = require('../database');

linksCtrl.renderAddLink = (req, res) => {
    res.render('links/add');
};

linksCtrl.addLink = async (req, res) => {
    const { title, description,ubicacion,habitacion,cama_sexo,red_externa,url,} = req.body;
    const newLink = {
        title,
        description,
        url,
        ubicacion,
        habitacion,
        cama_sexo,
        red_externa,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
}

linksCtrl.renderLinks = async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
}

linksCtrl.renderLinks_hospitalario = async (req, res) => {
    const links_hospitalario = await pool.query('SELECT * FROM links WHERE user_id = ? and url ="Piso"', [req.user.id]);
    res.render('links/list_hospitalario', { links_hospitalario });
}

linksCtrl.renderLinks_observacion = async (req, res) => {
    const links_observacion = await pool.query('SELECT * FROM links WHERE user_id = ? and url ="UCI Adulto"', [req.user.id]);
    res.render('links/list_observacion', { links_observacion  });
}


linksCtrl.renderLinks_admin = async (req, res) => {
    const links_admin = await pool.query('SELECT * FROM links WHERE user_id = ? and fecha_ingreso is null', [req.user.id]);
    res.render('links/list_todas', { links_admin });
}

linksCtrl.renderLinks_ocupadas = async (req, res) => {
    const links_ocupadas = await pool.query('SELECT * FROM links WHERE user_id = ? and fecha_ingreso is not null', [req.user.id]);
    res.render('links/list_ocupadas', { links_ocupadas });
}

linksCtrl.renderLinks_sedes_disponible = async (req, res) => {
    const links_sedes_disponible = await pool.query('SELECT * FROM links WHERE  fecha_ingreso is null', [req.user.id]);
    res.render('links/list_sedes_disponible', { links_sedes_disponible });
}

linksCtrl.deleteLink = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Censo Removed Successfully');
    res.redirect('/links');
};

linksCtrl.renderEditLink = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
};

linksCtrl.renderEditLink_egreso = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit_egreso', {link: links[0]});
};




linksCtrl.editLink_egreso = async (req,res) => {
    const { id } = req.params;
    const { title, description, url,fecha_egreso,cie_10_egreso,estado_egreso} = req.body; 
    const newLink = {
        title,
        description,
        url,
        fecha_egreso,
        cie_10_egreso,
        estado_egreso,
    };
    
    
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
}

linksCtrl.editLink = async (req,res) => {
    const { id } = req.params;
    const { title, description, url,procedencia,fecha_censo,fecha_ingreso, cie_10_ingreso,cedula,nombres,sexo,origen_ingreso,} = req.body; 
    const newLink = {
        title,
        description,
        url,
        procedencia,
        fecha_censo,
        fecha_ingreso,
        cie_10_ingreso,
        cedula,
        nombres,
        sexo,
        origen_ingreso,
        
    };
    
    
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Censo Updated Successfully');
    res.redirect('/links');
}




module.exports = linksCtrl;