import { CanActivateFn } from '@angular/router';

export const permisosGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem('token_logueado')){
    return true
  }else{
    return false
  }
  };
