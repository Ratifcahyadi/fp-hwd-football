import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from './events';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  selectedRound: number = 1; // Nilai awal untuk r
  apiUrl: string =
    'https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&s=2023-2024&r=';
  public events: Event[] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }
  nextRound() {
    if (this.selectedRound < 38) {
      this.selectedRound++;
      this.fetchData();
    }
  }

  previousRound() {
    if (this.selectedRound > 1) {
      this.selectedRound--;
      this.fetchData();
    }
  }

  fetchData() {
    const url = this.apiUrl + this.selectedRound;
    this.http.get(url).subscribe((data) => {
      const res: any = data;
      this.events = res.events;
      console.log(data);
    });
  }

     // Fungsi untuk mengubah format tanggal menjadi format bulan
    public formatDateToMonth(dateString: string): string {
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
  
      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
  
      return `${day} ${month} ${year}`;
    }
}
