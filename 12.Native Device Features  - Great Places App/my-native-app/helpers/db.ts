import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');


export const init = ()=>{

    const promise = new Promise((resolve,reject)=>{

        db.transaction(tx=>{
            tx.executeSql(
                'create table if not exists places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL );',
                [],
                ()=>{
                    resolve();
                },
                (_,error)=>{
                    reject(error);
                    return false;
                }
            )
        })
    })

    return promise;

}

export const insertPlace = (title:string,imageUrl:string,address:string,lat:number,lng:number):Promise<SQLResultSet>=>{

    return new Promise((resolve,reject)=>{

        db.transaction(tx=>{
            tx.executeSql(
                "INSERT INTO places (title,imageUrl,address,lat,lng) VALUES (?,?,?,?,?)",
                [title,imageUrl,address,lat,lng],
                (_,result)=>{
                    resolve(result);
                },
                (_,err)=>{
                    reject(err);
                    return false;
                }
            )
        })

    });

}


export const fetchPlaces = ():Promise<SQLite.SQLResultSet>=>{

    return new Promise((resolve,reject)=>{

        db.transaction(tx=>{
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (_,result)=>{
                    resolve(result);
                },
                (_,err)=>{

                    reject(err)
                    return false;

                }
            )   
        })

    })


}