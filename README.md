This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The project is divided into 2 parts, frontend (nextjs) and backend (express using nodejs). 

To run the frontend server

```bash
# frontend
npm run build
# this builds the nextjs app
npm run start
# this starts the nextjs app

#backend
cd ./server
# this changes the dir to ./server
node .
# this starts the backend which includes the websockets for message transfer, express server for the database endpoints for auth and fetching messages 
```

Open [http://localhost:3000](http://localhost:3000/chat) with your browser to see the result.
