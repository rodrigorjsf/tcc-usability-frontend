import {Observable} from 'rxjs';
import {RegisterDTO} from "../../models/dto/RegisterDTO";

export interface LoginAuthentication {
  id: any;
  nome: string;
  email: string;
  ddd: any;
  celular: any;
  login: any;
  password: any;
  registroAtivo: any;
  estaLogado: any;
  ip: any;
  mac: any;
  rg: any;
  orgao: any;
  uf: string;
  emissao: any;
  cpf: any;
  dataNascimento: any;
  status: any;
  perfilId: any;
  lastUpdate: any;
  lastActivityTimestamp: any;
}

export abstract class Authentication {
  abstract postLoginAuthentication(login, password): Observable<LoginAuthentication>;

  abstract postRegister(registerDTO: RegisterDTO): Observable<LoginAuthentication>;
}
