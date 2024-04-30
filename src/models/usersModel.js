var db = require('../db/conn_db');


exports.addUserModel = async (userData, callback) => {
    const { document_type, document_number, first_name, last_name, cellphone, email, password, salt } = userData;
    const query = 'INSERT INTO auth (document_type, document_number, first_name, last_name, email, cellphone, password, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [document_type, document_number, first_name, last_name, email, cellphone, password, salt];

    db.execute(query, values, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result.insertId);  // Returning the new user's ID
    });
};

/*
//Add new user
const addUserModel = async (userData, result) => {
    await connection.query('INSERT INTO auth SET ?', userData, (error, result) => {
        if(error){			
			return result(error, null);
		}else{
			console.log("User data model: ",results.insertId);
			return result(null, results.insertId);
		}
    })
}

//Update user
const updateUserAuthModel = async (id, userData, result) => {
	await connection.query(`UPDATE auth SET ? WHERE id = ${id}`, userData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id)
		}
	});
}

//Update Password
const updatePassAuthModel = async (id, userData, result) => {
	await connection.query(`UPDATE auth SET ? WHERE id = ${id}`, userData, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id);
		}
	});
}

//Update status user
const updateStatusModel = async (id, status, result) => {
	console.log("User model: ", id)
	console.log("Status model: ", status.status)
	await connection.query(`UPDATE auth SET is_active = ${status.status} WHERE l.user_id = ${id}`, (error, results) => {
		if(error){
			return result(error, null);
		}else{
			return result(null, results.id);
		}
	})
}
 
//Delete user by Id
const deleteUserAuthModel = async (id, result) => {
	await connection.query(`DELETE FROM auth WHERE id = ${id}`, (error, results) =>{
		if(error){
			return result(error, null)
		}else{
			return result(null, results.id)
		}
	});			
}

const listUserByIdModel = async (id, result) => {
	await connection.query(`SELECT u.doc_type_id, u.doc_number, u.names, u.last_names, u.phone, u.email, u.rol_id FROM auth AS u WHERE u.id = ${id}`, (error, results) => {
		if(error){
			return result(error, null)
		}else{
			return result(null, results)
		}
	})
}

const userAuthByEmail = async (email, result) => {
	try {
	  const [rows] = await conn.execute(
		'SELECT id,email,password,is_active,is_staff FROM auth WHERE email = ? ORDER BY ID DESC LIMIT 1',
		[email]
	  );
  
	  conn.release(); // Importante: ¡No olvides liberar la conexión cuando hayas terminado!
  
	  console.log('Rta model: ', rows);
	  return result(null, rows);
	} catch (error) {
	  console.error('Error en la consulta: ', error);
	  return result(error, null);
	}
  };

module.exports = {
    addUserModel,
    updateUserAuthModel,
    deleteUserAuthModel,
	userAuthByEmail,
	updatePassAuthModel,
	updateStatusModel,
	listUserByIdModel
}; */