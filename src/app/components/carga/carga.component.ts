import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor( public loadImages: CargaImagenesService ) { }

  ngOnInit(): void {
  }

  cargarImagenes(): void  {
    this.loadImages.cargarImagenesFirebase(  this.archivos );
  }

  limpiarArchivos(): void {
    this.archivos = [];
  }
}