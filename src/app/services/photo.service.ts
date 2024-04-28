import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Isso registra o serviço como um provedor raiz, tornando-o disponível em todo o aplicativo
})
export class PhotoService {


   getImages(): Promise<string[]> {

    return new Promise<string[]>((resolve) => {
      const images: string[] = [
        'https://i.imgur.com/tnapKV1.jpeg',
        'https://i.imgur.com/2hpaP0b.jpeg',
        'https://i.imgur.com/VdT1Qsd.jpeg'
      ];
      resolve(images);
    });
  }

  constructor() { }

  // Exemplo de método no serviço para retornar dados
  getData(): string[] {
    return ['Item 1', 'Item 2', 'Item 3'];
  }

  // Outros métodos do serviço podem ser definidos aqui
}
