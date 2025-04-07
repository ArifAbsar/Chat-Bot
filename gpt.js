import { Configuration,OpenAIApi } from "openai";
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';
import  Color  from "colors";
dotenv.config();


const configuration= new Configuration({
    apiKey: process.env.API_KEY
});
const openai=new  OpenAIApi(configuration);

async function selo(){
  console.log(Color.bold.yellow('Welcome to Chatbot'));
  const chatHistory=[];// to store chat history 
  while(true){
    const userInput=readlineSync.question(Color.green('You: '));
    try {
        //chat history mapping with messages
        const message= chatHistory.map(([role,content])=>({role,content}));
        message.push({role:'user',content: userInput});
        const completion =await openai.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages:message,
        });
        const completionText= completion.data.choices[0].message.content;
      if(userInput.toLowerCase()==='exit'){
        console.log(Color.blue('Bot: ')+completionText);
        return;
      }
      console.log(Color.blue('Bot: ')+completionText);
      //update history and response
      chatHistory.push(['user',userInput]);
      chatHistory.push(['assistant',completionText]);

    } catch (error) {
             console.error(Color.red(error));        
    }
  }
}
selo();