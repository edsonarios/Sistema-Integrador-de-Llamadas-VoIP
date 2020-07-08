import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutes } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/pages/inicio/login/login.component';

import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
import { AdministradorTemplateComponent } from './components/templates/administrador-template//administrador-template.component';

import { DialPadComponent } from './components/pages/operador/dialpad/dialpad.component';

import { AddFriendComponent } from '@operador/addfriend/add_friend.component';
import { AgendaComponent } from '@operador/agenda/agenda.component';
import { NotificacionComponent } from '@operador/notificacion/notificacion.component';
import { SalaComponent } from '@operador/sala/sala.component';
import { PanelComponent } from '@operador/panel/panel.component';
import { ParticipanteComponent } from '@operador/participante/participante.component';

import { LlamadaComponent } from '@operador/llamada/llamada.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';

// Prueba tracking con Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistroLlamadasComponent } from './components/pages/operador/registro-llamadas/registro-llamadas.component';

import { IconsModule } from './icons/icons.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { InfoComponent } from './components/pages/operador/info/info.component';

// Socket IO
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AsteriskComponent } from './components/pages/operador/asterisk/asterisk.component';
const config: SocketIoConfig = {
    url: environment.asteriskUrl,
    options: {}
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        OperadorTemplateComponent,
        AdministradorTemplateComponent,
        DialPadComponent,
        AddFriendComponent,
        AgendaComponent,
        NotificacionComponent,
        SalaComponent,
        LlamadaComponent,
        PanelComponent,
        ParticipanteComponent,
        RegistroLlamadasComponent,
        InfoComponent,
        AsteriskComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: false
        }),
        AccordionModule,
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        PopoverModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        FontAwesomeModule,
        IconsModule,
        SnotifyModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService],
    bootstrap: [AppComponent],
    entryComponents: [DialPadComponent]
})
export class AppModule {}
