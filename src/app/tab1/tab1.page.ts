import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonList, IonButton, IonLabel, IonSelect, IonSelectOption, IonTextarea} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiciomultaService } from '../services/serviciomulta.service';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonList, IonButton, IonLabel, IonSelect, IonSelectOption, IonTextarea, CommonModule, FormsModule],
})
export class Tab1Page {
  codigoMarbete: string = '';
  vehiculo: any = {};
  tipoInfraccion: string = '';
  descripcion: string = '';
  fotos: string[] = [];
  audio: string = '';
  infracciones: string[] = ['Exceso de velocidad', 'Estacionamiento indebido', 'Conducción temeraria', 'Uso de celular al conducir'];
  public audioUrl: string | undefined;
  public grabando: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private servicioMulta: ServiciomultaService // Inject the service
  ) {}

  async ngOnInit() {
    await this.servicioMulta.init();  // Initialize the service
  }

  // Fetch the vehicle data from an external API
  buscarVehiculo() {
    if (this.codigoMarbete.trim() === '') return;

    this.http.get(`https://api.adamix.net/itla.php?m=${this.codigoMarbete}`)
      .subscribe((data: any) => {
        this.vehiculo = data;
      }, (error) => {
        console.error('Error al obtener datos del vehículo:', error);
      });
  }

  // Take a photo
  async tomarFoto() {
    const photo = await this.servicioMulta.takePhoto();
    if (photo) this.fotos.push(photo);
  }

  // Save the multa data
  async guardarMulta() {
    const multaData = {
      codigoMarbete: this.codigoMarbete,
      vehiculo: this.vehiculo,
      tipoInfraccion: this.tipoInfraccion,
      descripcion: this.descripcion,
      fotos: this.fotos,
      audio: this.audio,
      fecha: new Date()
    };

    await this.servicioMulta.createMulta(multaData);  // Save via the service
    console.log('Multa guardada:', multaData);
    this.router.navigate(['/tabs/tab2']);
  }

  async iniciarGrabacion() {
    const permission = await VoiceRecorder.requestAudioRecordingPermission();
    if (!permission.value) {
      alert('Permiso de grabación denegado');
      return;
    }
    this.grabando = true;
    await VoiceRecorder.startRecording();
  }

  async detenerGrabacion() {
    const result: RecordingData = await VoiceRecorder.stopRecording();
    this.grabando = false;

    if (result.value && result.value.recordDataBase64) {
      this.audioUrl = `data:audio/aac;base64,${result.value.recordDataBase64}`;
      this.audio = this.audioUrl;
      console.log('Audio guardado:', this.audio);
    } else {
      console.error('Error al obtener la grabación de audio');
    }
  }
}
