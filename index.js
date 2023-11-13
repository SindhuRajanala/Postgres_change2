const express = require('express')
const cors=require('cors')
const app = express()
const port = 3010
///console.log(`line 4`)
// const vaidya_db = require('./vaidya_db')
const merchant_model = require('./patient')
app.use(cors());


// app.use(cors({
// 	origin: "http://localhost:3011" // Replace with your trusted domain
//   }));
app.use(express.json())
// app.use(function (req, res, next) {
// 	  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// 	  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
// 	  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
// 	      next();
// 	      });
	
             app.post('/', (req, res) => {
				const { patients_id } = req.body;
	        merchant_model.get_pat_dlts(patients_id)
			  .then(response => {
	              res.status(200).send(response);
	                })
	                  .catch(error => {
	                      res.status(500).send(error);
	                        })
	                        })
							app.get('/getdocdtls', (req, res) => {
							//res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
								merchant_model.get_doctor_dtls()
								
								  .then(response => {
									  res.status(200).send(response);
										})
										  .catch(error => {
											  res.status(500).send(error);
												})
												})

	
                        app.post('/patient', (req, res) => {
                          merchant_model.create_Pat_dtls(req.body)
	                            .then(response => {
	                                res.status(200).send(response);
	                                  })
	                                    .catch(error => {
	                                        res.status(500).send(error);
	                                          })
	                                          })
											  app.post('/doctor', (req, res) => {
												console.log(`Inside Doctor.`)
												merchant_model.create_doctor_account(req.body)
													  .then(response => {
														console.log(`Inside Doctor sucessful.`)
														  res.status(200).send(response);
															})
															  .catch(error => {
																console.log(`Inside Doctor fail.${error}`)
																  res.status(500).send(error);
																	})
																	})
																	app.post('/Users', (req, res) => {
																		merchant_model.Users(req.body)
																		  .then(result => {
																			console.log(`Inside User successful.`);
																			res.status(200).send(result);
																		  })
																		  .catch(error => {
																			console.log(`Inside User fail. ${error}`);
																			res.status(500).send(error);
																		  });
																	  });
																	  
	
	                                          app.delete('/patient/:fst_nme', (req, res) => {
												console.log(`Inside Delete ${req.params.fst_nme}.`)
	                                            merchant_model.delete_Pat_dtls(req.params.fst_nme)
	                                              .then(response => {
	                                                  res.status(200).send(response);
	                                                    })
	                                                      .catch(error => {
	                                                          res.status(500).send(error);
	                                                            })
	                                                            })
	                                                            app.listen(port, () => {
	                                                              console.log(`App running on port ${port}.`)
	                                                              })
