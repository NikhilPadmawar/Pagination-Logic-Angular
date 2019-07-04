import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class pokemonService 
{
private  url = "http://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.url);
  } 

}
