import React, { useState } from "react";
import { useParams } from 'react-router-dom';

function UserSelection() {
    const[cpu_name,setCpuName] = useState("")
    const[gpu_name,setGpuName] = useState("")
    const[ram_name,setRAMName] = useState("")
    const { buildCode } = useParams();

    fetch('/api/get-build?code='+buildCode)
    .then((response) => response.json())
    .then((data) => {
        setCpuName(data.cpu_name);
        setGpuName(data.gpu_name);
        setRAMName(data.ram_name);
    });

    return (
        <div> 
            <h3>{buildCode}</h3>
            <p>CPU: {cpu_name}</p>
            <p>GPU: {ram_name}</p>
            <p>RAM: {gpu_name}</p>
        </div>
    );
}

export default UserSelection;