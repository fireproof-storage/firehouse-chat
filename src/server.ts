import type * as Party from "partykit/server";

import { fireproof, type Database } from "@fireproof/core"

import { makeStores, ConnectS3 } from '@fireproof/connect'
import { ConnectPartyKit } from '@fireproof/partykit'

const dbs = new Map<string, Database>()

function myFireproof(name: string, partyHost?: string) {
  if (dbs.has(name)) {
    return dbs.get(name) as Database
  }
  const s3conf = {
    upload: 'https://04rvvth2b4.execute-api.us-east-2.amazonaws.com/uploads',
    download: 'https://sam-app-s3uploadbucket-e6rv1dj2kydh.s3.us-east-2.amazonaws.com'
  }
  const s3conn = new ConnectS3(s3conf.upload, s3conf.download)
  const partyConn = new ConnectPartyKit({ name, host: partyHost || 'http://localhost:1999' })

  const store = makeStores(s3conn, partyConn)

  const db = fireproof(name, { store })
  dbs.set(name, db)
  return db
}

export default class Server implements Party.Server {
  db: Database
  constructor(readonly room: Party.Room) {
    this.db = myFireproof(room.id, process.env.PARTYKIT_HOST as string)
    this.db.subscribe(async () => {
      const latest = await this.db.changes([], {limit: 5})
      console.log('latest', latest.rows.map((row) => row.value.message || row.value.reaction))
    })
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // let's send a message to the connection
    conn.send("hello from server");
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);


      this.db.allDocs().then((docs) => {
        console.log('docs', docs.rows.map((row) => row.value.message || row.value.reaction))
      })

    // as well as broadcast it to all the other connections in the room...
    this.room.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      [sender.id]
    );
  }
}

Server satisfies Party.Worker;
