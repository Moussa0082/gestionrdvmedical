import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { ShowelementService } from './services/showelement.service';
import { LoginPatientService } from './services/login-patient.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreationrendezvousComponent } from './creationrendezvous/creationrendezvous.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShowelementService]
})
export class AppComponent implements OnInit {

  title = 'Gestion Rendez Vous App';

  isVisible = true;
  isAccueilPage: boolean = false;
  isLoginPage: boolean = false;
  isCreateAdminAccountPage: boolean = false;
  isAdminAccueilPage: boolean = false;
  isCreatePatientAccountPage: boolean = false;
  isPatientLoginPage: boolean = false;
  isListeDocPage: boolean = false;
  isListesRendezVousPage: boolean = false;
  isListeRendezVousPage: boolean = false;
  isBlankPage: boolean = false;
  isListePatientPage: boolean = false;
  // isConnected: boolean = false;
  // isUserLoggedIn: boolean = false;
  isLogAccueilPage: boolean = false;


  isUserLoggedIns : boolean = false;


  constructor(private router: Router, private dialog : MatDialog, private showElementService : ShowelementService, private connect : LoginPatientService) {
  this.isVisible = false;
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.isBlankPage = event.url === '/';
    }
    if (event instanceof NavigationEnd) {
      this.isAccueilPage = event.url === '/accueil';
    }
    if (event instanceof NavigationEnd) {
      this.isLoginPage = event.url === '/login';
    }
    if (event instanceof NavigationEnd) {
      this.isCreateAdminAccountPage = event.url === '/create-admin';
    }
    if (event instanceof NavigationEnd) {
      this.isAdminAccueilPage = event.url === '/admin-accueil';
    }
    if (event instanceof NavigationEnd) {
      this.isPatientLoginPage = event.url === '/patient-login';
    }
    if (event instanceof NavigationEnd) {
      this.isCreatePatientAccountPage = event.url === '/create-patient';
    }
    // listes des rendez vous 
    if (event instanceof NavigationEnd) {
      this.isListesRendezVousPage = event.url === '/listes-rdv';
    }
    // rendez vous calendrier
    if (event instanceof NavigationEnd) {
      this.isListeRendezVousPage = event.url === '/liste-rdv';
    }
    
    if (event instanceof NavigationEnd) {
      this.isListeDocPage = event.url === '/liste-doc';
    }
    if (event instanceof NavigationEnd) {
      this.isListePatientPage = event.url === '/liste-patient';
    }
   

  });
   }

  ngOnInit(): void {
    this.connect.isUserLoggedIn = false; 
    const loggedIn = localStorage.getItem('loggedInPatient');
    if(loggedIn){
   this.isUserLoggedIns = loggedIn === 'true';
  }
  this.isUserLoggedIns = loggedIn === 'false';
    
  }

  OnChange(): any {
    this.connect.isUserLoggedIn = true; 
  }

  
  isUserLoggedIn() {
    return this.connect.getIsUserLoggedIn();
  }

  

  
  log(isVisible: boolean): any { 
    this.showElementService.toggleVisibility;
  }

  tr :boolean = this.log(true);
  
  // isLoggedIn$!: Observable<boolean>; 
  
  logoutAdmin(){
    Swal.fire({
      title: 'Voulez vous vraiment vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38B198',
      cancelButtonColor: 'red',
      cancelButtonText:'Non'
    })
    .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Vous avez bien été déconnecté bye, à bientôt',
            icon:'success',
            confirmButtonColor: '#38B198',
            confirmButtonText: 'OK'
          })
          this.router.navigate(['/login']);
        }
      })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('loggedInPatient');
    if (token) {
      return true; // Autoriser l'accès à la route
    } else {
      this.router.navigate(['/patient-login']);
      return false; // Rediriger vers la page de connexion
    }
  }


  logoutPatient() {
    localStorage.removeItem('loggedInPatient');

    Swal.fire({
      title: 'Voulez vous vraiment vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38B198',
      cancelButtonColor: 'red',
      cancelButtonText:'Non'
    })
    .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Vous avez bien été déconnecté bye, à bientôt',
            icon:'success',
            confirmButtonColor: '#38B198',
            confirmButtonText: 'OK'
          })
          this.router.navigate(['/patient-login']);
        }
      })
   
  }

  navigateToLoginPage(){
    this.router.navigate(['/patient-login']);
  }


 
  openDialog() {
    const dialogRef = this.dialog.open(CreationrendezvousComponent,{
      width: '650px',
      height:'570px',
    });


  }


}
