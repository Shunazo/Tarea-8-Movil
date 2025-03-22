import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ServiciomultaService {
  private _storage: Storage | null = null;
  private multas: any[] = [];

  constructor(private storage: Storage) { }

  async init() {
    this._storage = await this.storage.create();
    const storedMultas = await this._storage.get('multas');
    this.multas = Array.isArray(storedMultas) ? storedMultas : [];  // Ensure it's always an array
  }
  

  // Fetch all stored multas
  async getMultas() {
    return this.multas;
  }

  // Fetch a specific multa by ID
  async getMultaById(id: string) {
    return this.multas.find(multa => multa.id === id);
  }

  // Create a new multa
  async createMulta(multa: any) {
    multa.id = uuidv4();
    
    if (!Array.isArray(this.multas)) {
      this.multas = []; // Ensure multas is an array
    }
  
    this.multas.push(multa);
    await this._storage?.set('multas', this.multas);
  }
  

  // Take a photo and return the image path
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    return image.webPath;
  }

  async deleteMulta(id: string) {
    this.multas = this.multas.filter(multa => multa.id !== id);
    await this._storage?.set('multas', this.multas);
  }
}
