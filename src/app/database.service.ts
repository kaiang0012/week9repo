import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }
  result: any;

  getActors() {
    return this.http.get("/actors");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  getMovies() {
    return this.http.get("/movies");
  }

  createMovie(data: any) {
    return this.http.post("/movies", data, httpOptions);
  }

  deleteMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteBetween(year: any) {
    return this.http.delete("/movies/", {body:year});
  }

  addActorToMovie(id: string, actorid: any) {
    let url = '/movies/' + id + '/actors'
    return this.http.post(url, actorid, httpOptions)
  }
}
