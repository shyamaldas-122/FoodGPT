let url="https://www.themealdb.com/api/json/v1/1/search.php?s="; // for dish name
let url2="https://www.themealdb.com/api/json/v1/1/search.php?f="; // for single character

async function response(message) {
    if(message.length==1){
        const response = await fetch(url2 + message);
        const data = await response.json();
        console.log("Whole data:",data);
        console.log("type:",typeof(data.meals));
        return data.meals;
    }
    else{
        const response = await fetch(url + message);
        const data = await response.json();
        console.log("Whole data:",data);
        console.log("Api call:",data.meals);
        return data.meals;
    }
    
}

export default response;