import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Clienti {
  nome: string;
  cognome: string,
  email: string;
}


// const CLIENTI: Clienti[] = [

//   {nome: 'Mario', cognome: 'Rossi', email: 'mario.rossi@email.com'},
//   {nome: 'Giulia', cognome: 'Bianchi', email: 'giulia.bianchi@email.com'}, 
//   {nome: 'Luca', cognome: 'Verdi', email: 'luca.verdi@email.com'},
//   {nome: 'Anna', cognome: 'Neri', email: 'anna.neri@email.com'},
// ]


@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css'
})


export class ClientiComponent implements OnInit  {
  clienti: Client[]=[];
  selectedClientId: number | null = null;

  displayedColumns: string[] = ['nome', 'cognome', 'email', 'edit', 'delete'];
  userform: FormGroup;
  constructor(private clientservice: ClientService, private fb: FormBuilder) {
    this.userform = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
   this.getClient();
  }

  getClient(): void {
    let id=sessionStorage.getItem('userId');
    this.clientservice.getClientsbyId(parseInt(id as string)).subscribe({
      next: (clienti) => {
        this.clienti=clienti;
      },
      error: (err) => console.error('Errore nel recupero dei clienti', err)
    })


  }
  //dataSource = CLIENTI;
  onSubmit(): void {
    if(this.userform.valid) {
        if(this.selectedClientId === null) {

          let id=sessionStorage.getItem('userId');
          const cliente = {...this.userform.value, userId: id};
          this.clientservice.addClient(cliente).subscribe({
            next: (response) => {
              this.getClient();
            },
            error: (error) => {
              console.error('Errore', error);
            }
          });

        } else {
          let userId=sessionStorage.getItem('userId');
          const cliente = {...this.userform.value, id: this.selectedClientId, userId: userId};
          this.clientservice.updateClient(cliente).subscribe({
              next: (response) => {
                this.getClient();
                this.selectedClientId = null;
              },
          });

        }
      }

    }

    onEdit(cliente: Client): void {
      this.userform.patchValue({
        nome: cliente.nome,
        cognome: cliente.cognome,
        email: cliente.email
      });

      this.selectedClientId = cliente.id !== undefined ? cliente.id : null;
  
  }

  onDelete(clientId: number): void {
    this.clientservice.deleteClient(clientId).subscribe(() => {
      this.clienti = this.clienti.filter(cliente => cliente.id !== clientId);
    });
  }

}



