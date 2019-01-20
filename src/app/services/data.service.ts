import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable()

export class DataService {
    constructor(private url:string, private http:Http){}

    getAuthenticated()
    {
       
               
    }
}

