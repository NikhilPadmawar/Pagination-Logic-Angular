import { Component, OnInit } from '@angular/core';
import { pokemonService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [pokemonService]
})
export class AppComponent implements OnInit {
  title = 'app';
  pokemon = [];
  current_page = 1;
  records_per_page = 3;
  pokemonObj = [];
  lastPage = undefined;

  constructor(private pokemonService: pokemonService) { }

  ngOnInit() {
    this.pokemonService.getEvents().subscribe(res => {
      this.pokemon = res.results;
      this.changePage(1);
    });
  }


  prevPage() {
    if (this.current_page > 1) {
      this.current_page--;
      this.changePage(this.current_page);
    }
  }

  nextPage() {
    if (this.current_page < this.numPages()) {
      this.current_page++;
      this.changePage(this.current_page);
    }
  }

  changePage(page: any) {
    this.pokemonObj = [];

    if (page < 1) page = 1;
    if (page > this.numPages()) page = this.numPages();

    for (let i = (page - 1) * this.records_per_page; i < (page * this.records_per_page); i++) {
      if (i < this.pokemon.length)
        this.pokemonObj.push(this.pokemon[i].name);
    }

    if (page == this.numPages()) {
      this.lastPage = this.numPages();
    }
    else {
      this.lastPage = undefined;
    }
  }

  numPages() {
    return Math.ceil(this.pokemon.length / this.records_per_page);
  }

}
