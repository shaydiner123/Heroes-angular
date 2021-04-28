import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';
import { PageNotFoundComponent } from './shared/Components/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeroBoxComponent } from './heroes/hero-box/hero-box.component';
import { AuthInterceptorService } from './auth/Services/auth-interceptor.service';
import { ErrorComponent } from './shared/Components/error/error.component';
import { NumberFormattingPipe } from './heroes/custom-pipes/number-formatting.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    HeroesComponent,
    PageNotFoundComponent,
    HeroBoxComponent,
    ErrorComponent,
    NumberFormattingPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
