import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import validateEmail from "../emailValidator"
import axios from "../axios"



export default function SellerRegisterComponent() {

    const navigate = useNavigate()
    
    useEffect(() => {
        if (!localStorage.token) {
            navigate("/seller/register")
        }}, [localStorage.token])
    
        const [alert,setAlert] = useState({
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            phone_number: '',
        })
        const [success, setSuccess] = useState("")
        const [error, setError] = useState("")
        const [signup, setSignup] = useState(
            {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                phone_number: '',
                password: '',
            }
        )
    
        const signUpUser = async (first_name, last_name, username, email, phone_number, password) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                console.log(localStorage.token);
                const response = await axios.post("/sellersignup", {
                first_name,
                last_name,
                username,
                email,
                phone_number,
                password
                }, config)
    
                const data =  response.data 
                localStorage.removeItem("token")
                console.log(data)
    
                setSuccess("Successful")
    
                
    
                setTimeout(()=>{
                    // setSuccess("")
                    console.log(success, "success")
                    
                    navigate("/seller/login")
                }, 5000)
                
            } catch (error) {
                console.log(error.response.data.error)
                setError(error.response.data.error)
            }
        }
    
        
        
    
    
    const handleSubmit =(e)=> {
        e.preventDefault()
    
        signUpUser(signup.first_name,signup.last_name,signup.username,signup.email,signup.phone_number ,signup.password)
        const emailValidator= validateEmail(signup.email)
        if (emailValidator){
            setAlert(
                {
                    message: "Please enter a valid email",
                    color: 'red',
                    status: false,
                },
                5000
            )
        }
        setTimeout(()=>{
            setAlert({
                message: '',
                color: '',
                status: '',
                show: true,
            }, 5000)
        })
    
        let newPassword = `${signup.password}`
        const minNumOfChars = 6
        const maxNumOfChars = 32
        if (
            newPassword.length < minNumOfChars || newPassword.length > maxNumOfChars ){
            setAlert(
                {
                    message: `password length must be greater 6`,
                    color: 'red',
                    status: '',
                    show: false,
                },
                5000
            )
        }
        setTimeout(()=>{
            setAlert({
                message: '',
                color: '',
                status: '',
                show: true,
            })
        }, 5000)
    
        let newPhone_number = `${signup.phone_number}`
        const minNumOfCharsPhone_number = 11
        const maxNumOfCharsPhone_number = 13
        if (newPhone_number.length < minNumOfCharsPhone_number || newPhone_number.length > maxNumOfCharsPhone_number){
            setAlert(
                {
                    message: `phone number should be 11 digits`,
                    color: 'red',
                    status: '',
                    show: false,
                },
                5000
            )
        }
        setTimeout(()=>{
            setAlert({
                message: '',
                color: '',
                status: '',
                show: true,
            })
        }, 5000)
    
        return
    }
    
        function handleChange(e){
           setSignup({...signup, [e.target.name]: e.target.value})
    }
    
    
    
        return (
            <>
            <main>
                <section class="breadcrumb__area box-plr-75">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-12">
                                <div class="breadcrumb__wrapper">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                          <li class="breadcrumb-item active" aria-current="page">Seller Sign up</li>
                                        </ol>
                                      </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="login-area pb-100">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 offset-lg-2">
                                <div class="basic-login">
                                    <h3 class="text-center mb-60"> Seller Signup</h3>
    
                {success && <div style={{border: "1px solid black", padding: "20px", backgroundColor: "#008000", color: "#ffffff"}}>{success}</div>}
                 {error && <div style={{border: "1px solid black", padding: "20px", backgroundColor: "#f44336", color: "#ffffff"}} >{error}</div>}
                                    
                                    <form method="POST" onSubmit={handleSubmit}>
    
                                    <label for="first_name">First name <span>**</span></label>
                                        <input id="first_name" 
                                        type="text" 
                                        placeholder="Enter First name" 
                                        name="first_name"
                                        value={signup.first_name}
                                        onChange={handleChange}/>
    
    
                                        <label for="last_name">Last name <span>**</span></label>
                                        <input id="last_name" 
                                        type="text" 
                                        placeholder="Enter Lastname" 
                                        name="last_name"
                                        value={signup.last_name}
                                        onChange={handleChange}/>
    
    
    
                                        <label for="username">Username <span>**</span></label>
                                        <input id="username" 
                                        type="text"
                                         placeholder="Enter Username"                               
                                        name="username"
                                        value={signup.username}
                                        onChange={handleChange}/>
    
    
                                        <label for="email-id">Email Address <span>**</span></label>
                                        <input 
                                        id="email-id"
                                        type="email" 
                                        placeholder="Email address..." 
                                        name="email"
                                        value={signup.email}
                                        onChange={handleChange}/>
    
                                        <label for="phone_number">Phone Number <span>**</span></label>
                                        <input 
                                        id="phone_number"
                                        type="text" 
                                        placeholder="Phone Number" 
                                        name="phone_number"
                                        value={signup.phone_number}
                                        onChange={handleChange}/>
    
    
                                        <label for="pass">Password <span>**</span></label>
                                        <input 
                                        id="pass" 
                                        name="password" 
                                        type="password" 
                                        placeholder="Enter password..."
                                        value={signup.password}
                                        onChange={handleChange}
                                        />
    
                                        <div class="mt-10"></div>
                                        <button type="submit" class="t-y-btn w-100">Register Now</button>
                                        <div class="or-divide"><span>or</span></div>
                                        <Link to="/seller/login" class="t-y-btn t-y-btn-grey w-100">login Now</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
     
            </main>
    
            </>
        )
    }