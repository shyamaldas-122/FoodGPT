import { useEffect, useRef, useState } from 'react'
import sendBtn from './assets/send.svg'
import useIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import food1 from './assets/food1.svg'
import food2 from './assets/food2.svg'
import food3 from './assets/food3.svg'
import spoon from  './assets/spoon.svg'
import linkedin from './assets/linkedin.svg'
import github from './assets/github.svg'
import response from './MealAPI.js'
import Card from './Card'
import './App.css'

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
    if (input === '') return; // if user type nothing and press send button.
    const txt=input;
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
    // Checking user input valid or not
    if (res){
      const random=Math.floor(Math.random()*res.length)
      const newMessage3 = {
        text: res[random],
        isBot: true
      };
      setMessage([...message, newMessage2,newMessage3]);
    }
    else{
      const notFound = {
        text: {
            msg: `I'm sorry, I couldn't find information about "${txt}". It might not be in my database. Can I help you with something else?`,
        },
        isBot: true
      };
      setMessage([...message, newMessage2,notFound]);
    }
  }

  // handel enterkey
  const handelEnter=(event)=>{
    if (event.key==='Enter'){
      handelSend()
    }
  }

  const handleQuery=async(e)=>{
    const txt=e.target.value;
    const newMessage = {
      text: {
          msg: txt,
      },
      isBot: false
    };
    setMessage([...message, newMessage]);
    const res= await response(txt)
    const random=Math.floor(Math.random()*res.length)
    const newMessage2 = {
      text: {
          msg: txt,
      },
      isBot: false
    };
    const newMessage3 = {
      text: res[random],
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
                <button className='query' onClick={handleQuery} value={"Tandoori chicken"}><img src={food3}  alt='Query'/>Tandoori chicken</button>
              </div>
          </div>
          <div className='lowerSide'>
          <div className='' style={{textAlign:"center",fontSize:"16px"}}>🚀💻Connect With me💻🚀</div>
          <a href='https://www.linkedin.com/in/shyamal122/' target='_blank' style={{color:"white", textDecoration:"none"}}><div className='listItems'><img src={linkedin} alt='' className='listItemsImg' width="40px"/>LinkedIn</div></a>
          <a href='https://github.com/shyamaldas-122' target='_blank' style={{color:"white", textDecoration:"none"}}><div className='listItems'><img src={github} alt='' className='listItemsImg'width="40px" />Github</div></a>
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
