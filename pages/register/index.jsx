import { Button, Checkbox, InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { useEffect, useState } from "react";
import { app } from "../../utils/firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from 'axios'

const src = "https://media.sugarcosmetics.com/upload/authSIe2.jpg"
const hiSrc = "https://media.sugarcosmetics.com/upload/Hi!.png"

export default function Login(){

    const [Number, setNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [ toggle, setToggle ] = useState(false)
 
    let configureCaptcha = () => {

        const auth = getAuth()
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              onSignInSubmit();
            },
            defaultCountry : "IN"
          }, auth);
    }

    let onSignInSubmit = () => {

        configureCaptcha()
        const phoneNumber = "+91"+ Number
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setToggle(true)
        }).catch((error) => {
            console.log('Sms Not sent');
        });
    
    }

    let addUser = async() => {

        let obj =  { mobile : Number }

        try{

            let data = await axios.post('http://localhost/3000/api/registration/signUp', obj)
            
            console.log(data)

        }
        catch(e){
            console.log("error", e)
        }

    }

    let onSubmitOTP = () => {
        const code = otp
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user));
            alert('Verified')
        }).catch((error) => {
            alert('bad verification code')
        });
    }

    return (
       <Box sx={{
        display : "flex"
       }} >
             <Box sx={{
                width : "641px",
                height : "786px",
                }} >
                    <Image loader={()=>src} src={src} alt="icon" width={641} height={786} />
            </Box>
            <Box sx={{
                height : "716px",   
                width: "1000px",
                backgroundImage : `url(${'https://media.sugarcosmetics.com/upload/loginPageBackGroundTexture.png'})`
            }} >
                <Box sx={{
                    marginTop : "100px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }} >
                    <Image loader={()=>hiSrc} src={hiSrc} alt="hiIcon" width={172.9} height={114} />
                </Box>
                <Box sx={{
                    marginTop : "10px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    fontSize : "18px"
                }} >
                    <p style={{ fontSize :"18px" , fontFamily : "sans-serif" }} >Login/Sign Up Using Phone</p>
                </Box>
                <Box sx={{
                    marginTop : "10px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                }}>
                    {
                        !toggle
                        ?
                        <TextField
                            label="Enter Mobile Number"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '382px' }}
                            onChange={(e)=>setNumber(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
                            }}
                        />
                        :
                        <TextField id="outlined-basic" label="Enter OTP"  sx={{ m: 1, width: '382px' }} variant="outlined" onChange={(e)=>setOtp(e.target.value)} />
                    }
                </Box>
                <Box sx={{
                    marginTop : "12px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                }}>
                    <p style={{ color: "#757575", width: "740px", height : "66px", fontFamily: "sans-serif", fontSize :"13px", textAlign : "center" }} >Registering for this site allows you to access your order status and history. Just fill in the above fields, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</p>
                </Box>
                <Box sx={{
                    marginTop : "60px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                }} >
                    <div id="sign-in-button"></div>
                     {
                        !toggle
                        ?
                        <Button variant="contained" disabled={ Number.length === 10 ? false : true } sx={{
                            fontSize : "13px",
                            color : "white"
                        }} onClick={()=>{
                            onSignInSubmit()
                        }}>
                            Send ME OTP
                        </Button>
                        :
                        <Button variant="contained" disabled={ otp.length === 6 ? false : true } sx={{
                            fontSize : "13px",
                            color : "white"
                        }} onClick={()=>{
                            onSubmitOTP()
                            addUser()
                        }}>
                            VALIDATE THIS
                        </Button>
                    }
                </Box>
                <Box sx={{
                     margin : "auto",
                     marginTop : "10px",
                     display : "flex",
                     justifyContent : "center",
                     alignItems : "center",
                     color : "gray",
                     border : "1px dashed gray",
                     marginBottom : "10px",
                     borderBottom : "none",
                     width : "95%" 
                }} >
                </Box>
                <Box sx={{
                    marginTop : "-10px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                }} >
                    <Checkbox defaultChecked size="small" />
                    <span style={{ fontFamily : "sans-serif", fontSize : "12px", color : "gray" }} > Get important updates on Whatsapp <span style={{color : "red"}} > Terms and Conditions </span> </span>
                </Box>
                <Box sx={{
                    marginTop : "40px",
                    display : "flex",
                    justifyContent : "right",
                    width :"96%",
                    alignItems : "right",
                    fontFamily : "sans-serif",
                    fontSize : "13px"
                }}>
                    Need Help? <span style={{ color : "red" }} > Contact Us</span>
                </Box>
                <Box sx={{
                    margin : "auto",
                    marginTop : "10px",
                    marginBottom : "10px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    color : "gray",
                    border : "1px dashed gray",
                    borderBottom : "none",
                    width : "95%"                    
                }} >
                    
                </Box>
                <Box sx={{
                    marginTop : "0px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    fontFamily : "sans-serif", 
                    fontSize : "12px"
                }}>
                    By Signing up or logging in, you agree to our &nbsp; <span style={{color : "red"}} >Terms and Conditions</span>
                </Box>
            </Box>
       </Box>
    )
}