import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-multa',
  templateUrl: './detalle-multa.page.html',
  styleUrls: ['./detalle-multa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonList, IonButton, RouterLink]
})
export class DetalleMultaPage {
  multa: any;
  audioUrl: string | null = null; // Define the audioUrl property

  constructor(private storage: Storage, private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.storage.create();
    const multaId = this.route.snapshot.paramMap.get('id');
    if (multaId) {
      this.cargarDetalle(multaId);
    }
  }

  async cargarDetalle(multaId: string) {
    const storedMultas = await this.storage.get('multas');
    if (storedMultas) {
      this.multa = storedMultas.find((m: any) => m.id === multaId);
      if (this.multa && this.multa.audio) {

        this.audioUrl = this.multa.audio;
      }
    }
  }
}