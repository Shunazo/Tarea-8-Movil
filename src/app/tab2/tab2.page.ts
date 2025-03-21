import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonRouterLink } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular'; // Import Storage service
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, CommonModule, DatePipe, IonRouterLink, RouterLink],
})
export class Tab2Page {
  multas: any[] = [];

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create(); // Initialize the Storage service
  }

  async ionViewWillEnter() {
    const stored = await this.storage.get('multas');
    this.multas = Array.isArray(stored) ? stored : []; // If stored is already an array, use it, otherwise, default to empty array.
  }
  
  async borrarTodo() {
    await this.storage.remove('multas');
    this.multas = [];
  }

  // Método para navegar a la página de detalles
  verDetalle(multaId: string) {
    this.router.navigate(['/detalle-multa', multaId]);
  }
}