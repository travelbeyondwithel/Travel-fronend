import { useEffect, useState } from "react";
import { getHomeData } from "../api/homeApi";

function useHome(){

    const [homeData, setHomeData]=useState(null);

    const [loading, setLoading]=useState(true);

    const [error, setError]=useState(null);

    useEffect(() =>{

        async function fetchHome(){

            try{

                const response=await getHomeData();

                setHomeData(response.data);

            }

            catch(err){

                setError(err);

            }
            finally{

                setLoading(false);

            }
        }
        fetchHome();
    }, []);

    return{

        homeData,

        loading,

        error
    };
}

export default useHome;