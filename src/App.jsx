import { useEffect, useRef, useState } from 'react'
import home from './assets/home.svg'
import save from './assets/bookmark.svg'
import sendBtn from './assets/send.svg'
import useIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import food1 from './assets/food1.svg'
import food2 from './assets/food2.svg'
import food3 from './assets/food3.svg'
import spoon from  './assets/spoon.svg'
import './App.css'
import response from './MealAPI.js'
import Card from './Card'

function App() {
  const msgEnd=useRef(null)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState([
    {
    text:{
      msg:"Hey, I'm Shyamal Das, the brain behind FoodGPT! Welcome to FoodGPT🥘—your ultimate culinary companion. Hungry for a specific dish? Looking for its ingredients, step-by-step instructions, or a helpful video tutorial? You're in the right place! Simply search for any dish, and I'll serve up its recipe, ingredients, and cooking instructions. Plus, I've curated a collection of YouTube videos for a visual cooking experience. Let's embark on a flavorsome journey together—search, cook, and relish!🍽🥂",
    } ,
    isBot:true
    },
]);

useEffect(()=>{
  // targeting message end
  msgEnd.current.scrollIntoView();
},[message])

  const handelSend =async ()=>{
    const txt=input;
    setInput('')
    const newMessage = {
      text: {
          msg: txt,
      },
      isBot: false
    };
    setMessage([...message, newMessage]);
    const res= await response(input)
    // console.log("Message=",message);
    const newMessage2 = {
      text: {
          msg: txt,
      },
      isBot: false
    };
    const newMessage3 = {
      text: res,
      isBot: true
    };
    setMessage([...message, newMessage2,newMessage3]);
  }

  // handel enterkey
  const handelEnter=(event)=>{
    if (event.key==='Enter'){
      handelSend()
    }
  }

  const handleQuery=async(e)=>{
    const txt=e.target.value;
    setInput('')
    const newMessage = {
      text: {
          msg: txt,
      },
      isBot: false
    };
    setMessage([...message, newMessage]);
    const res= await response(txt)
    const newMessage2 = {
      text: {
          msg: txt,
      },
      isBot: false
    };
    const newMessage3 = {
      text: res,
      isBot: true
    };
    setMessage([...message, newMessage2,newMessage3]);
  }

  return (
    <div className='App'>
      <div className='sidebar'>
          <div className='upperSide'>
              <div className='uppperSideTop'><img src={food1} style={{width:"18%"}} alt='' className='logo'/><span className='brand'>FoodGPT</span></div>
              <button className='midbtn' onClick={()=>{window.location.reload()}}><img src={spoon} alt='' className='addBtn'/>Find Your Food</button>
              <div className='upperSideButtom'>
                <button className='query' onClick={handleQuery} value={"Matar Paneer"}><img src={food2} alt='Query'/>Matar Paneer</button>
                <button className='query' onClick={handleQuery} value={"Biryani"}><img src={food3}  alt='Query'/>Biryani</button>
              </div>
          </div>
          <div className='lowerSide'>
          <div className='' style={{textAlign:"center",fontSize:"16px"}}>🚀💻Connect With me💻🚀</div>
            <div className='listItems'><img src={home} alt='' className='listItemsImg'/>Home</div>
            <div className='listItems'><img src={save} alt='' className='listItemsImg'/>Saved</div>
            {/* <div className='listItems'><img src={rocket} alt='' className='listItemsImg'/>Upgrade to Pro</div> */}
          </div>
      </div>
      <div className='main'>
          <div className='chats'>
            {message.map((message,index)=>
             ( <div key={index} className={message.isBot? "chat bot":"chat"}>
                <img className='chatImg' src={message.isBot? gptImgLogo:useIcon} alt=''/>{message.text.msg?<p className='text'>{message.text.msg}</p>: <Card myMeal={message.text}/>} 
                {/* message.text["strMeal"] */}
              </div>)
            )}

            {/* {message.map((message, index) => (
              <div key={index} className={"chat bot"}>
                <img className='chatImg' src={gptImgLogo} alt=''/><p className="text">{message.text.msg}</p>
              </div>
            ))} */}
            <div ref={msgEnd}></div>
          </div>
          <div className='chatFooter'>
              <div className='inp'>
              <input type="text" placeholder="Type a Dish Name Here…" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handelEnter}/><button className='send' onClick={handelSend}><img src={sendBtn} alt='send' className='arrow'/></button>
              </div>
              <p>FoodGPT🥘 can make mistakes. Consider checking important information.</p>
          </div>
      </div>
    </div>
  )
}

export default App
