
# Audio-text-query API

This repo contains the API that receives audio and a query about it. It converts the audio to text and extracts information with OpenAI.




## Installations required

 - Python
 - Visual Studio dev tools (to be used in langchain)
 - NodeJS




## Installation

Install with npm

```bash
  npm i 
  npm run start
```
Create folder public/uploads in the root of the project.

## API Reference


#### Audio transcription

```http
  POST /api/audio/transcription
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `audio`      | `file` | **Required**. File in mp3 format |
| `query`      | `string` | **Required**. Query related to the audio in order to get information about it |


