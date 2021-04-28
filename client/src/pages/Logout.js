import { useEffect } from "react"
import React from 'react'
import axios from "axios"
import { useHistory } from "react-router"
import { useContext } from "react"
import { userContext } from "../App"


const Logout = () => {
    const { state, dispatch } = useContext(userContext)
    const history = useHistory();
    useEffect(() => {
        axios.get("/user/logout").then((result) => {
            dispatch({ type: "USER", payload: false })
            history.push("/")
        }).catch((error) => console.log(error))

    }, [])
    return (
        <div>

        </div>
    )
}

export default Logout
