
    const getcharsSerie = async   (id_serie, token) =>{
        return await this.axios.get({url : "https://api.betaseries.com/shows/characters", 
        headers : {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        params : {id : id_serie}
        })
    }

export default getcharsSerie;