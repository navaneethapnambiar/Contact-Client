import { Component, OnInit } from '@angular/core';
import { ContactViewDto } from '../../../../common/dtos/contact-view-dto';
import { ContactService } from '../../../../common/services/contact.service';
import { ContactCreateDto } from '../../../../common/dtos/contact-create-dto';
import { ContactUpdateDto } from '../../../../common/dtos/contact-update-dto';
import { AuthService } from '../../../../common/services/auth.service';

@Component({
  selector: "app-contact",
  standalone: false,
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent implements OnInit {
  contactForm: ContactCreateDto = {
    name: "",
    phonenUmber: "",
    userId: "",
  };

  contacts: ContactViewDto[] = [];
  searchTerm: string = "";
  selectedContactId: number | null = null;

  constructor(
    private contactService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  get filteredContacts(): ContactViewDto[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.contacts;

    return this.contacts.filter((contact) =>
      contact.name?.toLowerCase().startsWith(term)
    );
  }

  loadContacts(): void {
    this.contactService.getAll().subscribe((res) => {
      if (res.success) this.contacts = res.data;
    });
  }

  onSubmit(): void {
    this.contactForm.userId = this.authService.getCurrentUserId();
    if (this.selectedContactId) {
      const updateDto: ContactUpdateDto = {
        name: this.contactForm.name,
        phoneNumber: this.contactForm.phonenUmber,
      };
      this.contactService
        .update(this.selectedContactId, updateDto)
        .subscribe(() => this.resetFormAndReload());
    } else {
      this.contactService
        .create(this.contactForm)
        .subscribe(() => this.resetFormAndReload());
    }
  }

  editContact(contact: ContactViewDto): void {
    this.selectedContactId = contact.id;
    this.contactForm = {
      name: contact.name,
      phonenUmber: contact.phoneNumber,
      userId: contact.userId,
    };
  }

  deleteContact(id: number): void {
    this.contactService.delete(id).subscribe(() => this.loadContacts());
  }

  resetFormAndReload(): void {
    this.contactForm = { name: "", phonenUmber: "", userId: "" };
    this.selectedContactId = null;
    this.loadContacts();
  }
}
