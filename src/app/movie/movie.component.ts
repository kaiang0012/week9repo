import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];

  section = 9;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = "";
  year: number = 0;
  movieId: string ="";
  year1: number = 0;
  year2: number = 0;

  constructor(private dbService: DatabaseService) { }

  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });

    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }

  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item: any) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie between Range
  onDeleteBetween() {
    let year = {year1: this.year1, year2: this.year2}
    this.dbService.deleteBetween(year).subscribe(result => {
      this.onGetMovies();
    })
  }

  onSelectActor(item: any) {
    this.fullName = item.name;
    this.actorId = item._id;
  }

  onSelectMovie(item: any) {
    this.title = item.title;
    this.movieId = item._id;
  }

  onAddActorToMovie() {
    let obj = {id: this.actorId};
    this.dbService.addActorToMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  ngOnInit(): void {
    this.onGetMovies();
  }

  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
    this.year1 = 0;
    this.year2 = 0;
  }
}
