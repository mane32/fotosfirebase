import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', [`$event`])
  public onDragEnter( event: any ): any {
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', [`$event`])
  public onDragLeave( event: any ): any {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', [`$event`])
  public drop( event: any ): any {

    const transferencia = this._getTransfer( event );

    if ( !transferencia ) {
      return;
    }

    this._extraerArchivos( transferencia.files );

    this._prevenirDetener( event );
    this.mouseSobre.emit( false );

  }

  private _getTransfer( event: any ): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ): void {
    // console.log();
    // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {

      const archivoTemp = archivosLista[propiedad];

      if ( this._archivoPuedeSerCargado( archivoTemp )) {

        const nuevoArchivo = new FileItem( archivoTemp );
        this.archivos.push( nuevoArchivo );

      }
    }

    console.log( this.archivos );

  }

  // Validaciones
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this._archivoFueDroppeado( archivo.name ) && this._esImagen( archivo.type )) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener( event ): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoFueDroppeado( nombreArchivo: string ): boolean {

    for ( const archivo of this.archivos ) {
      if (archivo.nombreArchivo === nombreArchivo ) {
        console.log('El archivo' + nombreArchivo + 'ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}