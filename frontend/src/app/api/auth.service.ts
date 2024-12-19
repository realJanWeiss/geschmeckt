import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestDTO} from '../../../../backend/src/users/dtos/request/user.request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public registerUser(userRequestDTO: UserRequestDTO) {
    this.http.post('http://localhost:3000/authentication/register', userRequestDTO).subscribe((res) => {
      console.log(res);
    });
  }

}
