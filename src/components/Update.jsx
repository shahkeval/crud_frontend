import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Update = () =>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);

    const [error,setError] = useState("");
    const navigate = useNavigate();
    const{id}= useParams();

    const getSingleUser = async ()=>{
            
            const response =await fetch(`http://localhost:5000/showSingle${id}`);
            const result = await response.json();
            if(!response.ok)
                {
                     console.log(result.error);
                     setError(result.error);
                }
                if(response.ok)
                {
                 setError("");
                 console.log("updated user",result);
                 setName(result.name);
                 setEmail(result.email);
                 setAge(result.age);
                }   
    };

    const handleUpdate = async(e)=>{
        e.preventDefault();
        const updatedUser={name,email,age};
        const response = await fetch(`http://localhost:5000/update${id}`,{
            method:"PATCH",
            body: JSON.stringify(updatedUser),
            headers:{
                "content-Type":"application/json",
            },
        });
        const result =await response.json();
        if(!response.ok)
        {
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok)
        {
            console.log(result);
            setError("");
            navigate("/all");
        }
    }

    useEffect(()=>{
        getSingleUser();
    },[])


    return(
        <div className="container my-2">
        {error && <div class="alert alert-danger">{error}</div>}
<h2 className="text-center">Edit The Data</h2>
<form onSubmit={handleUpdate}>
<div className="mb-3">
<label className="form-label">Name</label>
<input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
</div>
<div className="mb-3">
<label className="form-label"> Email address</label>
<input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
</div>
<div className="mb-3">
<label className="form-label">Age</label>
<input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)}/>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
}
export default Update;