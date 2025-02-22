import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { RolesService } from './roles.service';

const TOKEN_KEY = "AuthToken";


@Injectable({
 providedIn: 'root'
})
export class TokenService {
  realRole!:string;

 constructor(private router: Router) { 
  
 }


 public isLogged(): boolean {
  if (this.getToken()) {
    return true;
  }
  return false;
 }
public isAdmin(): boolean {
  const expectedRole: string = "ADMINISTRADOR";
  this.realRole=this.getRol();
  if (this.getToken()) {
    if (this.validarCadenasIguales(expectedRole,this.realRole)) {
      return true;
    }
    return false;
  }
  return false;
 }
public isEmpleado(): boolean {
  const expectedRole: string = "EMPLEADO";
  this.realRole=this.getRol();
  if (this.getToken()) {
    if (this.validarCadenasIguales(expectedRole,this.realRole)) {
      return true;
    }
    return false;
  }
  return false;
 }

 public setToken(tokesessionStoragen: string) {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, tokesessionStoragen);
 }
public getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
 }

public login(token: string) {
  this.setToken(token);
  const rol = this.getRol();
  let destino = rol == "ADMINISTRADOR" ? "/home" : "/home";
  this.router.navigate([destino]).then(() => {
    window.location.reload();
  });
 } 
public logout() {
  window.sessionStorage.clear();
  this.router.navigate(["/login"]).then(() => {
    window.location.reload();
  });
 }
 
private decodePayload(token: string): any {
  const payload = token!.split(".")[1];
  const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
  const values = JSON.parse(payloadDecoded);
  return values;
 }

public getID(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.id;
  }
  return "";
 }
 public getRol(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.rol;
  }
  return "";
 } 
 public getEmail(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.email;
  }
  return "";
 }
 public getNombre(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.nombre;
  }
  return "";
 }

 public validarCadenasIguales(cadena1: string, cadena2: string): boolean {
  return cadena1 === cadena2;
}

}
