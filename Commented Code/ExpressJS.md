        // // Create new user (let MongoDB handle UserID generation)
        // console.log('saving user data')
        // let newUser;
        // try {
        //     newUser = await Userschema.create({
        //         name,
        //         email,
        //         password: hashedPassword,
        //         phone,
        //         address,
        //     });
        // } catch (error) {
        //     console.error('User creation error:', error);
            
        //     // Handle MongoDB duplicate key errors
        //     if (error.code === 11000) {
        //         const field = Object.keys(error.keyPattern)[0];
        //         let message = "Duplicate key error";
        //         let fieldName = field;
                
        //         switch (field) {
        //             case 'email':
        //                 message = "Email is already in use";
        //                 fieldName = "email";
        //                 break;
        //             case 'UserID':
        //                 message = "User ID already exists";
        //                 fieldName = "userId";
        //                 break;
        //             default:
        //                 message = `${field} is already taken`;
        //                 fieldName = field;
        //         }
                
        //         return res.status(400).json({
        //             success: false,
        //             message: message,
        //             field: fieldName,
        //             errorType: "duplicate"
        //         });
        //     }
            
        //     return res.status(500).json({
        //         success: false,
        //         message: error.message || "An error occurred during signup"
        //     });
        // }
        // console.log('Data saved')







          // // Create new admin (let MongoDB handle AdminID generation)
        // console.log('saving admin data')
        // let newAdmin;
        // try {
        //     newAdmin = await Adminschema.create({
        //         name,
        //         email,
        //         password: hashedPassword,
        //         phone,
        //         address,
        //         AdminCode: AdminCode
        //     });
        // } catch (error) {
        //     console.error('Admin creation error:', error);
            
        //     // Handle MongoDB duplicate key errors
        //     if (error.code === 11000) {
        //         const field = Object.keys(error.keyPattern)[0];
        //         let message = "Duplicate key error";
        //         let fieldName = field;
                
        //         switch (field) {
        //             case 'email':
        //                 message = "Email is already in use";
        //                 fieldName = "email";
        //                 break;
        //             case 'UserID':
        //                 message = "User ID already exists";
        //                 fieldName = "userId";
        //                 break;
        //             default:
        //                 message = `${field} is already taken`;
        //                 fieldName = field;
        //         }
                
        //         return res.status(400).json({
        //             success: false,
        //             message: message,
        //             field: fieldName,
        //             errorType: "duplicate"
        //         });
        //     }
            
        //     return res.status(500).json({
        //         success: false,
        //         message: error.message || "An error occurred during signup"
        //     });
        // }
        // console.log('Data saved')












        
        // // Check if admin email exists
        // const existingAdminEmail = await axios.get("http://127.0.0.1:8000/data_receiver/verify_Email", {
        //     params: { email }
        // });

        // if (existingAdminEmail.data.exists) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Email is already in use",
        //         field: "email",
        //         errorType: "duplicate"
        //     });
        // }




        // // // Check for existing user with same email
        // // console.log("checking if user email exists")
        // // // const existingUserEmail = await Userschema.findOne({ email });
        // // const existingUserEmail = axios.get("http://127.0.0.1:8000/data_receiver/verify_Email", {
        // //     params: { email }
        // // })
        // if (existingUserEmail) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Email is already in use",
        //         field: "email",
        //         errorType: "duplicate"
        //     });
        // }





