// not working

// let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
// async function response(){
//     fetch(url+ "Biryani")

//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         return data;
//     })
// }


let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
async function response(message) {
    const response = await fetch(url + message);
    const data = await response.json();
    console.log("Whole data:",data);
    console.log("Api call:",data.meals[0]);
    return data.meals[0];
}

export default response;