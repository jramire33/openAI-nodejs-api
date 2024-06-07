import { OpenAI as langchainOpenAI } from "@langchain/openai";
import OpenAI from 'openai';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OPENAI_API_KEY } from '../config.js';
import * as fs from 'fs';


const txtFileName = "VectorSave";
// const question = "List all hard skills of the candidate";
const txtPath = `./public/uploads/${txtFileName}.txt`;
const VECTOR_STORE_PATH = `${txtFileName}.index`;

export const getInfoFromText = async(req, res) => {
    const model = new langchainOpenAI({apiKey: OPENAI_API_KEY});
    const { input: text, question } = req.body;

    let vectorStore;
    if (fs.existsSync(VECTOR_STORE_PATH)) {
      console.log('Vector Exists..');
      vectorStore = await HNSWLib.load(VECTOR_STORE_PATH, new OpenAIEmbeddings());
    } else {
    //   const text = fs.readFileSync(txtPath, 'utf8');
      
      const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
      const docs = await textSplitter.createDocuments([text]);
      vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
      await vectorStore.save(VECTOR_STORE_PATH);
    }
  
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  
    const result = await chain.call({
      query: question,
    });
  
    res.status(200).json({
        result
    });

};

export const getTextFromAudio = async(req, res)=> {
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY
    });
    
    try {
        if(req.file){
            
            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream(`./public/uploads/${req.file.filename}`),
                model: "whisper-1",
                response_format: "json",
              });
            res.status(200).send(transcription);
        }
        else{
            res.status(400).json({ message: 'No file uploaded' });
        }
        
    } catch (error) {
        console.log('Error creating translation: ', error.message);
        throw error;
    }
};