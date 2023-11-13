const Pool = require('pg').Pool
const pool = new Pool({
	          user: 'postgres',
	          host: 'localhost',
	          database: 'postgres',
	          password: 'sindhu',
	          port: 5432,
});
/*const get_Pat_dtls = () => {
	  return new Promise(function(resolve, reject) {
		      pool.query('SELECT * FROM public.pat_dtls', (error, results) => {
			            if (error) {
					            reject(error)
					          }
			            resolve(results.rows);
			          })
		    }) 
}*/


const get_doctor_dtls = () => {
	return new Promise(function(resolve, reject) {
			pool.query('SELECT * FROM public.doctors', (error, results) => {
					  if (error) {
							  reject(error)
							}
					  resolve(results.rows);
					})
		  }) 
}

const create_Pat_dtls = (body) => {
	  return new Promise(function(resolve, reject) {
		      const { fst_nme, lst_nme, dob, gender, martial_sts, address, city, sts, zip_code, ph_no,alt_phn_no, prmy_phyn } = body
		      pool.query('INSERT INTO public.pat_dtls(fst_nme, lst_nme, dob,gender, martial_sts, address, city, sts, zip_code, ph_no,alt_phn_no,prmy_phyn) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *', [fst_nme, lst_nme, dob, gender, martial_sts, address, city, sts, zip_code, ph_no,alt_phn_no, prmy_phyn], (error, results) => {
			            if (error) {
					            reject(error)
					          }
			            resolve(`A new pat_dtls has been added:${fst_nme}`)
			          })
		    })
}

const create_doctor_account=(body) => {
	 return new Promise(function(resolve,reject){
		const{first_name,last_name,dob,doc_pic,degree_type} = body
	    pool.query('INSERT INTO public.doctors(first_name, last_name, dob, doc_pic, degree_type)VALUES ($1, $2, $3, $4, $5) RETURNING *',[first_name, last_name, dob, doc_pic, degree_type], (error, results) => {
			if (error) {
				reject(error)
			  }
		resolve(`A new Doctor has been added:${first_name},${last_name}`)
		}
			)}
	 )
}






const delete_Pat_dtls = () => {
	  return new Promise(function(resolve, reject) {
		      ///const fst_nme = parseInt(request.params.fst_nme)
			  const fst_nme = request.params.fst_nme
		      pool.query('DELETE FROM public.pat_dtls WHERE fst_nme = $1', [fst_nme], (error, results) => {
			            if (error) {
							    reject(`Delete Error ${error}`)
					            reject(error)
					          }
			            resolve(`_Pat_dtls deleted with ID: ${results}`)
			          })
		    })
}




const createUser = (body) => {
	const { name, email } = request.body
  
	pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(201).send(`User added with ID: ${result.insertId}`)
	})
  }


  const Users = (body) => {
	return new Promise(async function(resolve, reject) {
	  const { username, password } = body;
  
	  try {
		const result = await pool.query('SELECT * FROM users WHERE usrnme = $1 AND pswd = $2', [username, password]);
  
		if (result.rowCount === 1) {
		  resolve({ success: true, message: 'Login successful!' });
		} else {
		  resolve({ success: false, message: 'Invalid username or password' });
		}
	  } catch (error) {
		console.error(error);
		reject({ success: false, message: 'An error occurred' });
	  }
	});
  };
  

  const get_pat_dlts = (patients_id) => {
	return new Promise(function(resolve, reject) {
		//const pat_id = req.params.patients_id
		///const { patients_id } =  body.patients_id;
		/////console.log(patients_id);
			pool.query('SELECT * FROM patients_user INNER JOIN pat_dtls ON patients_user.patientid = pat_dtls.patient_id WHERE patients_user.patientid = $1;', [patients_id], (error, results) => {
			if (error) {
							  reject(error)
							}
					  resolve(results.rows);
					})
		  }) 
}
 /* app.get("/loginExpress", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM accounts WHERE username = $1 AND password = $2 returning *",
            [req.body.username, req.body.password])
        console.log("User found!");
    } catch (err) {
        console.error(err
			.message);
    }
});*/


module.exports = {
	 
	  create_Pat_dtls,
	  create_doctor_account,
	  delete_Pat_dtls,
	  createUser,
	  Users,
	  get_doctor_dtls,
	  get_pat_dlts
}
