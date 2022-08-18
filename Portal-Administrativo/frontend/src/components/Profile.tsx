import React from "react";
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated ? (
            <div>
                <br></br> <br></br>
                <h3>
                    Perfil
                </h3>

               
                <img src={user?.picture} alt="" />


                <h2>
                    {user?.name}
                </h2>

                <p>
                    {user?.sub}
                </p>

                <p>
                    {user?.email}
                </p>

            </div>
        )

        :

        (
            <div>
                <h2>
                    NO SE MUESTRA SU PERFIL YA QUE NO ESTA LOGUEADO
                </h2>
            </div>
        )
    )
}

export default Profile;