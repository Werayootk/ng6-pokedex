import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { PokemonDetail } from '../../models/pokemon-detail.model';
import { PokemonDataService } from './../../services/pokemon-data.service';
import { PokemonDetailWrapperComponent } from './../pokemon-detail-wrapper/pokemon-detail-wrapper.component';

@Component({
  selector: 'app-pokemon-list-wrapper',
  templateUrl: './pokemon-list-wrapper.component.html',
  styleUrls: ['./pokemon-list-wrapper.component.css']
})
export class PokemonListWrapperComponent implements OnInit {
  public pokemonList: Array<PokemonDetail> = [];
  public pokemonList$: Observable<Array<PokemonDetail>>;

  constructor(
    private pokemonService: PokemonDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pokemonList$ = this.pokemonService.getPokemonList();
  }

  public onOpenDialog(id: number) {
    this.pokemonService
      .getPokemonById(id)
      .pipe(take(1))
      .subscribe(res =>
        this.dialog.open(PokemonDetailWrapperComponent, {
          width: '100%',
          height: '100%',
          hasBackdrop: true,
          data: res
        })
      );
  }

  public onSearch(searchText: string) {
    this.pokemonList$ = this.pokemonService
      .getPokemonList()
      .pipe(
        map((pokemonDetailList: Array<PokemonDetail>) =>
          pokemonDetailList.filter(
            pokemon =>
              pokemon.name.toUpperCase().indexOf(searchText.toUpperCase()) >= 0
          )
        )
      );
  }
}
