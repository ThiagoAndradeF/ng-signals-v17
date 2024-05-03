import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MessageModel } from './Model/MessageModel';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5185';

  // sendMessage(message: string): Observable<string> {
  //   const messagePayload = { text: message };
  //   return this.http.post<string>(`${this.apiUrl}/respostaRobo`, messagePayload, { responseType: 'text' as 'json' });
  // }

  // sendMessage(message: string): Observable<string> {
  //   const url = `${this.apiUrl}/respostaRobo`;
  //   const data = { text: message };  // Encapsula a mensagem em um objeto
  
  //   return this.http.post<string>(url, data, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     responseType: 'json'  // Ajusta a resposta para 'json'
  //   });
  // }
  sendMessage(message: string): Observable<MessageModel> {
    const url = `${this.apiUrl}/Main`;
    const data = { Text: message };  // Note a mudança para 'Text' para corresponder ao backend
  
    return this.http.post<MessageModel>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    }).pipe(
      map(response => new MessageModel(response.text))  // Transforma a resposta JSON em MessageModel
    );
  }
  // getMessage(): Observable<string> {
  //   return this.http.get<string>(`${this.apiUrl}/respostaDoisRobo`)
  // }

}
