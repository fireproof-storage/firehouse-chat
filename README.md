# Firehouse - collaborative chat using Fireproof

The example is based on the PartyKit generator. Fireproof runs anywhere.

This app is a team chat application. It uses Gravatar for user avatars and Fireproof for real-time data synchronization. A real deployment would use a secure authentication method. 

In the workshop, we'll learn how the main timeline query works, how to add a new message, and how to create channels. We'll enable threads and look at AI integration on the backend. If we have time we will add file uploads and image previews.

## Running the app

* Git clone the repository
* Run `npm install`
* Run `npm run dev`

## Changing the code

Look in the `src` directory for the server and client code. The server code is in `server.ts` and the client code is in `client.ts`.

The client uses components from the `components` directory. The main chat component is in `components/Channel.tsx`. The sidebar is in `components/Sidebar.tsx`, and it lists all the channels.

### Generated PartyKit Info

Welcome to the party, pal!

This is a [Partykit](https://partykit.io) project, which lets you create real-time collaborative applications with minimal coding effort.

[`server.ts`](./src/server.ts) is the server-side code, which is responsible for handling WebSocket events and HTTP requests. [`client.ts`](./src/client.ts) is the client-side code, which connects to the server and listens for events.

You can start developing by running `npm run dev` and opening [http://localhost:1999](http://localhost:1999) in your browser. When you're ready, you can deploy your application on to the PartyKit cloud with `npm run deploy`.

Refer to our docs for more information: https://github.com/partykit/partykit/blob/main/README.md. For more help, reach out to us on [Discord](https://discord.gg/g5uqHQJc3z), [GitHub](https://github.com/partykit/partykit), or [Twitter](https://twitter.com/partykit_io).
