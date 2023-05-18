export  function saveRefreshToken(token: string, role:'user'|'administrator') {
    localStorage.setItem('api_refreshToken' + role, token);       
  }
  
  export function  getRefreshToken(role: 'user' | 'administrator') {
    const token =  localStorage.getItem('api_refreshToken' + role);
    return token + '';
  }
  
  export  function getToken(role:'user'|'administrator') {
    const token =  localStorage.getItem('api_token' + role);
    return 'Bearer ' + token;
  }
  
  export  function saveToken(token: string, role:'user'|'administrator') {
    localStorage.setItem('api_token' + role, token);       
  }
  
  export  function saveIdentity(identity: string, role:'user'|'administrator') {
    localStorage.setItem('api_identity' + role, identity);       
  }
  
  export  function getIdentity(role: 'user' | 'administrator'): string|null {
    return localStorage.getItem('api_identity' + role);       
  }
  