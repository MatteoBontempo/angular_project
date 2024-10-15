import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Client {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  userId: number;
}




@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private apiUrl = 'http://localhost:3000/clients'; //URL del json server


  constructor(private http: HttpClient) { }

  getClientsbyId(id: number): Observable<Client[]> {
    const url = `${this.apiUrl}?userId=${id}`;
    return this.http.get<Client[]>(this.apiUrl);
    
    //   getClients(): Observable<Client[]> {
    //     return this.http.get<Client[]>(this.apiUrl);

    // }

  }
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }


  updateClient(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
}

  deleteClient(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}