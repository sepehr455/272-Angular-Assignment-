import {Component, Inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {distinctUntilChanged} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-password-prompt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-prompt.component.html',
  styleUrl: './password-prompt.component.css'
})
export class PasswordPromptComponent implements OnInit {
  form!: FormGroup;
  isPasswordValid: boolean = false;
  @Input() confirmAction!: () => void;

  constructor(private http: HttpClient,
              private dialogRef: MatDialogRef<PasswordPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { confirmAction: () => void }) {
  }

  ngOnInit() {
    if (this.data.confirmAction) {
      this.confirmAction = this.data.confirmAction;
    }

    this.form = new FormGroup({
      password: new FormControl('', [Validators.required])
    });

    this.form.get('password')?.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(password => {
        this.verifyPassword(password || '');
      });
  }

  onConfirm() {
    if (this.isPasswordValid) {
      this.confirmAction();
      this.dialogRef.close();
    }
  }

  private verifyPassword(password: string) {
    const apiURL = `https://api.hashify.net/hash/md5/hex?value=${encodeURIComponent(password)}`;
    this.http.get<{ Digest: string }>(apiURL).subscribe({
      next: response => {
        this.isPasswordValid = response.Digest === 'fcab0453879a2b2281bc5073e3f5fe54';
      },
    });
  }

}
