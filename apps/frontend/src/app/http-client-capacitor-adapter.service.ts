import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientCapacitorAdapter {
  constructor() {}

  request<T>(
    method: 'get' | 'post' | 'delete',
    url: string,
    options?: any,
  ): Observable<T> {
    return from(
      CapacitorHttp[method]({
        headers: this.mapHeaders(options.headers),
        responseType: options.responseType,
        data: options.body,
        url,
      }).then((httpResponse) => {
        if (httpResponse.data.error !== undefined) {
          throw new HttpErrorResponse({
            ...httpResponse.data,
            status: httpResponse.status,
            statusText: httpResponse.data.error,
            url,
          });
        }
        return httpResponse.data as T;
      }),
    );
  }

  private mapHeaders(headers: any): Record<string, string> {
    if (!headers?.lazyUpdate) return {};
    return (headers.lazyUpdate as { name: string; value: string }[]).reduce<
      Record<string, string>
    >((acc, header) => {
      acc[header.name] = header.value;
      return acc;
    }, {});
  }
}
